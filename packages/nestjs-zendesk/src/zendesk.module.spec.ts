import { beforeAll, describe, expect, it } from "@jest/globals";
import { FactoryProvider, Provider } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { ZendeskClientOptions } from "node-zendesk";
import { ZendeskModule } from "./";
import { ZENDESK_MODULE, ZENDESK_TOKEN } from "./zendesk.constants";

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
    expect(res.exports).toHaveLength(1);
    expect(res.imports).toBeUndefined();
    expect(res.providers).toHaveLength(3);
    expect(res.module).toBeDefined();

    const [optionsProvider, classProvider, clientProvider] =
      res.providers as Provider[];
    expect(optionsProvider).toMatchObject({
      inject: [],
      provide: ZENDESK_MODULE,
    });
    expect((optionsProvider as FactoryProvider).useFactory).toBeInstanceOf(
      Function,
    );
    expect(classProvider).toEqual({
      inject: undefined,
      provide: undefined,
      useClass: undefined,
    });
    expect(clientProvider).toMatchObject({
      inject: [ZENDESK_MODULE],
      provide: ZENDESK_TOKEN,
    });
    expect((clientProvider as FactoryProvider).useFactory).toBeInstanceOf(
      Function,
    );
    expect(res.exports).toEqual([clientProvider]);
  });

  it("forRootAsync with useFactory", () => {
    const res = ZendeskModule.forRootAsync({ useFactory: () => options });
    expect(res.exports).toHaveLength(1);
    expect(res.imports).toBeUndefined();
    expect(res.module).toBeDefined();
    expect(res.providers).toHaveLength(2);
  });
});
