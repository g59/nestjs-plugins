import { beforeAll, describe, expect, it } from "@jest/globals";
import { Test } from "@nestjs/testing";
import { ZendeskClientOptions } from "node-zendesk";
import { ZendeskModule } from "./";

describe("ZendeskModule", () => {
  let module: ZendeskModule;
  const options: ZendeskClientOptions = {
    username: "name",
    token: "token",
    endpointUri: "http://example.com",
  };

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ZendeskModule],
    }).compile();

    module = moduleFixture.get(ZendeskModule);
  });

  it("defined", () => expect(module).toBeDefined());

  it("forRoot", () => {
    const res = ZendeskModule.forRoot(options);

    expect(res.exports).toHaveLength(1);
    expect(res.imports).toBeUndefined();
    expect(res.module).toBeDefined();
    expect(res.providers).toHaveLength(1);
  });

  it("forRootAsync", () => {
    const res = ZendeskModule.forRootAsync({});
    expect(res.exports).toMatchInlineSnapshot(`
[
  {
    "inject": [
      "ZENDESK_MODULE",
    ],
    "provide": "ZENDESK_TOKEN",
    "useFactory": [Function],
  },
]
`);
    expect(res.imports).toBeUndefined();
    expect(res.providers).toMatchInlineSnapshot(`
[
  {
    "inject": [],
    "provide": "ZENDESK_MODULE",
    "useFactory": [Function],
  },
  {
    "inject": undefined,
    "provide": undefined,
    "useClass": undefined,
  },
  {
    "inject": [
      "ZENDESK_MODULE",
    ],
    "provide": "ZENDESK_TOKEN",
    "useFactory": [Function],
  },
]
`);
    expect(res.module).toBeDefined();
  });

  it("forRootAsync with useFactory", () => {
    const res = ZendeskModule.forRootAsync({ useFactory: () => options });
    expect(res.exports).toHaveLength(1);
    expect(res.imports).toBeUndefined();
    expect(res.module).toBeDefined();
    expect(res.providers).toHaveLength(2);
  });
});
