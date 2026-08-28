import assert from "node:assert/strict";
import { before, describe, it } from "node:test";
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

  before(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [ZendeskModule],
    }).compile();

    module = moduleFixture.get(ZendeskModule);
  });

  it("defined", () => assert.ok(module));

  it("forRoot", () => {
    const res = ZendeskModule.forRoot(options);

    assert.equal(res.exports?.length, 1);
    assert.equal(res.imports, undefined);
    assert.ok(res.module);
    assert.equal(res.providers?.length, 1);
  });

  it("forRootAsync", () => {
    const res = ZendeskModule.forRootAsync({});
    assert.equal(res.exports?.length, 1);
    assert.equal(res.imports, undefined);
    assert.equal(res.providers?.length, 3);
    assert.ok(res.module);

    const [optionsProvider, classProvider, clientProvider] =
      res.providers as Provider[];
    assert.deepEqual((optionsProvider as FactoryProvider).inject, []);
    assert.equal((optionsProvider as FactoryProvider).provide, ZENDESK_MODULE);
    assert.equal(
      typeof (optionsProvider as FactoryProvider).useFactory,
      "function",
    );
    assert.deepEqual(classProvider, {
      inject: undefined,
      provide: undefined,
      useClass: undefined,
    });
    assert.deepEqual((clientProvider as FactoryProvider).inject, [
      ZENDESK_MODULE,
    ]);
    assert.equal((clientProvider as FactoryProvider).provide, ZENDESK_TOKEN);
    assert.equal(
      typeof (clientProvider as FactoryProvider).useFactory,
      "function",
    );
    assert.equal(res.exports?.[0], clientProvider);
  });

  it("forRootAsync with useFactory", () => {
    const res = ZendeskModule.forRootAsync({ useFactory: () => options });
    assert.equal(res.exports?.length, 1);
    assert.equal(res.imports, undefined);
    assert.ok(res.module);
    assert.equal(res.providers?.length, 2);
  });
});
