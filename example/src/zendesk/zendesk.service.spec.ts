import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Test, TestingModule } from "@nestjs/testing";
import { ZENDESK_TOKEN } from "nestjs-zendesk";
import { ZendeskService } from "./zendesk.service";

describe("ZendeskService", () => {
  let service: ZendeskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZendeskService,
        {
          provide: ZENDESK_TOKEN,
          useFactory: () => undefined,
        },
      ],
    }).compile();

    service = module.get<ZendeskService>(ZendeskService);
  });

  it("should be defined", () => assert.ok(service));
});
