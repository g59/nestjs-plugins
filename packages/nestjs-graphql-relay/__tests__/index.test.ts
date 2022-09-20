import { Column, DataSource, Entity, PrimaryGeneratedColumn } from "typeorm";
import { findAndPaginate, getPagingParameters } from "../src";

@Entity()
class Example {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;
}

describe("app", () => {
  let AppDataSource: DataSource;
  beforeAll(async () => {
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

  afterAll(() => AppDataSource.destroy());

  it("getPagingParameters", () => {
    expect(getPagingParameters({})).toMatchInlineSnapshot(`Object {}`);
    expect(getPagingParameters({ first: 1 })).toMatchInlineSnapshot(`
      Object {
        "limit": 1,
        "offset": 0,
      }
    `);
    expect(() => getPagingParameters({ first: 1, after: "after" }))
      .toThrowErrorMatchingInlineSnapshot(`"invalid before query"`);
    expect(() => getPagingParameters({ last: 1, before: "before" }))
      .toThrowErrorMatchingInlineSnapshot(`"invalid before query"`);
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
      expect(res).toMatchInlineSnapshot(`
        Object {
          "edges": Array [],
          "pageInfo": Object {
            "endCursor": null,
            "hasNextPage": false,
            "hasPreviousPage": false,
            "startCursor": null,
          },
        }
      `);
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
      res.edges.map(({ node }) => expect(node.name).toEqual(name));
      expect(res.pageInfo).toMatchSnapshot();
    });
  });
});
