import { ZendeskModule } from "./";
import { Test } from "@nestjs/testing";

describe("ZendeskModule", () => {
  let module: ZendeskModule;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ZendeskModule],
    }).compile();

    module = moduleFixture.get(ZendeskModule);
  });

  it("defined", () => expect(module).toBeDefined());

  it("forRoot", () => {
    const res = ZendeskModule.forRoot({
      username: "name",
      token: "token",
      remoteUri: "http://example.com",
    });

    expect(res.exports).toHaveLength(1);
    expect(res.imports).toBeUndefined();
    expect(res.module).toBeDefined();
    expect(res.providers).toHaveLength(1);
  });

  it("forRootAsync", () => {
    const res = ZendeskModule.forRootAsync({});
    expect(res.exports).toMatchInlineSnapshot(`
      Array [
        Object {
          "inject": Array [
            "ZENDESK_MODULE",
          ],
          "provide": "ZENDESK_TOKEN",
          "useFactory": [Function],
        },
      ]
    `);
    expect(res.imports).toBeUndefined();
    expect(res.providers).toMatchInlineSnapshot(`
      Array [
        Object {
          "inject": Array [],
          "provide": "ZENDESK_MODULE",
          "useFactory": [Function],
        },
        Object {
          "inject": Array [
            Array [],
          ],
          "provide": undefined,
          "useClass": undefined,
        },
        Object {
          "inject": Array [
            "ZENDESK_MODULE",
          ],
          "provide": "ZENDESK_TOKEN",
          "useFactory": [Function],
        },
      ]
    `);
    expect(res.module).toBeDefined();
  });
});
