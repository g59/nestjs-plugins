import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Injectable } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { IncomingWebhook } from "@slack/webhook";
import { InjectSlack } from "../src/injectSlack";
import { SlackModule } from "../src/slackModule";

describe("InjectSlack", () => {
  const url = "SLACK_WEBHOOK_URL";
  let module: TestingModule;

  @Injectable()
  class TestService {
    public constructor(
      @InjectSlack() public readonly slackClient: IncomingWebhook,
    ) {}
  }

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [SlackModule.forRoot({ url })],
      providers: [TestService],
    }).compile();
  });

  describe("when decorating a class constructor parameter", () => {
    it("should inject the slack client", () => {
      const testService = module.get(TestService);
      assert.ok("slackClient" in testService);
      assert.ok(testService.slackClient instanceof IncomingWebhook);
    });
  });
});
