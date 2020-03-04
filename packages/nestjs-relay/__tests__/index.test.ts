import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  getRepository,
  Connection,
  createConnection
} from "typeorm";
import { getPagingParameters, findAndPaginate } from "../src";

@Entity()
class Example {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;
}

describe("nestjs-relay", () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection({
      type: "sqlite",
      database: "nestjs-relay-test",
      synchronize: true,
      entities: [Example]
    });
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

  it("findAndPaginate", async () => {
    const res = await findAndPaginate<Example>({}, {}, getRepository(Example));
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
});
