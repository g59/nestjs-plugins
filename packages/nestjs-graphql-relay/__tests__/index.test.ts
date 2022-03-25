import {
  Column,
  Connection,
  createConnection,
  Entity,
  getRepository,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Factory } from "typeorm-factory";
import { findAndPaginate, getPagingParameters } from "../src";

@Entity()
class Example {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;
}

describe("app", () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection({
      type: "sqlite",
      database: "nestjs-plugins",
      synchronize: true,
      entities: [Example],
    });

    const repo = getRepository(Example);
    await connection.query(`DELETE from ${repo.metadata.tableName}`);
  });

  afterAll(() => connection.close());

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
        getRepository(Example),
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
      const f = new Factory(Example).attr("name", "random name");
      await f.createList(123);
      await f.createList(123, {
        name,
      });

      const res = await findAndPaginate(
        {
          where: { name },
        },
        {},
        getRepository(Example),
      );
      res.edges.map(({ node }) => expect(node.name).toEqual(name));
      expect(res.pageInfo).toMatchSnapshot();
    });
  });
});
