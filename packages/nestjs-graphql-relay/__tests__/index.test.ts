import { random } from "faker";
import { Factory } from "typeorm-factory";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  getRepository,
  Connection,
  createConnection,
} from "typeorm";
import { getPagingParameters, findAndPaginate } from "../src";

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
    expect(() =>
      getPagingParameters({ first: 1, after: "after" })
    ).toThrowErrorMatchingInlineSnapshot(`"invalid before query"`);
    expect(() =>
      getPagingParameters({ last: 1, before: "before" })
    ).toThrowErrorMatchingInlineSnapshot(`"invalid before query"`);
  });

  describe("findAndPaginate", () => {
    it("empty", async () => {
      const res = await findAndPaginate<Example>(
        {},
        {},
        getRepository(Example)
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
      const name = random.words();
      const f = new Factory(Example).attr("name", random.alphaNumeric(10));
      await f.createList(random.number({ max: 5 }));
      await f.createList(random.number({ max: 5 }), {
        name,
      });

      const res = await findAndPaginate<Example>(
        {
          where: { name },
        },
        {},
        getRepository(Example)
      );
      res.edges.map(({ node }) => expect(node.name).toEqual(name));
      expect(res.pageInfo).toMatchInlineSnapshot(`
        Object {
          "endCursor": "YXJyYXljb25uZWN0aW9uOjE=",
          "hasNextPage": false,
          "hasPreviousPage": false,
          "startCursor": "YXJyYXljb25uZWN0aW9uOjA=",
        }
      `);
    });
  });
});
