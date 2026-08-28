import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { Column, DataSource, Entity, PrimaryGeneratedColumn } from "typeorm";
import { findAndPaginate, getPagingParameters } from "../src";

@Entity()
class Example {
  @PrimaryGeneratedColumn({ type: "integer" })
  readonly id: number;

  @Column({ type: "varchar" })
  readonly name: string;
}

describe("app", () => {
  let AppDataSource: DataSource;
  before(async () => {
    AppDataSource = new DataSource({
      type: "sqlite",
      database: "nestjs-plugins",
      synchronize: true,
      entities: [Example],
    });

    await AppDataSource.initialize();

    const repo = AppDataSource.getRepository(Example);
    await AppDataSource.query(`DELETE from ${repo.metadata.tableName}`);
  });

  after(() => AppDataSource.destroy());

  it("getPagingParameters", () => {
    assert.deepEqual(getPagingParameters({}), {});
    assert.deepEqual(getPagingParameters({ first: 1 }), {
      limit: 1,
      offset: 0,
    });
    assert.throws(
      () => getPagingParameters({ first: 1, after: "after" }),
      /invalid before query/,
    );
    assert.throws(
      () => getPagingParameters({ last: 1, before: "before" }),
      /invalid before query/,
    );
  });

  describe("findAndPaginate", () => {
    it("empty", async () => {
      const res = await findAndPaginate(
        {
          where: { name: "undefined" },
        },
        {},
        AppDataSource.getRepository(Example),
      );
      assert.deepEqual(res, {
        edges: [],
        pageInfo: {
          endCursor: null,
          hasNextPage: false,
          hasPreviousPage: false,
          startCursor: null,
        },
      });
    });

    it("find", async () => {
      const name = "name";
      await AppDataSource.query(
        `INSERT INTO ${
          AppDataSource.getRepository(Example).metadata.tableName
        } ("name") VALUES ("random name")`,
      );
      await AppDataSource.query(
        `INSERT INTO ${
          AppDataSource.getRepository(Example).metadata.tableName
        } ("name") VALUES ("${name}")`,
      );

      const res = await findAndPaginate(
        {
          where: { name },
        },
        {},
        AppDataSource.getRepository(Example),
      );
      res.edges.forEach(({ node }) => {
        assert.equal(node.name, name);
      });
      assert.deepEqual(res.pageInfo, {
        endCursor: "YXJyYXljb25uZWN0aW9uOjA=",
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: "YXJyYXljb25uZWN0aW9uOjA=",
      });
    });
  });
});
