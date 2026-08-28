import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { IncomingWebhook } from "@slack/webhook";
import { SLACK_TOKEN } from "./../src/slackConstants";
import { SlackModule } from "./../src/slackModule";
import { SlackOptions, SlackOptionsFactory } from "./../src/slackOptions";

describe("slackModule", () => {
  const url = "SLACK_WEBHOOK_URL";

  class TestService implements SlackOptionsFactory {
    createSlackOptions(): SlackOptions {
      return {
        url,
      };
    }
  }

  @Module({
    exports: [TestService],
    providers: [TestService],
  })
  class TestModule {}

  describe("forRoot", () => {
    it("provide slack client", async () => {
      const module = await Test.createTestingModule({
        imports: [SlackModule.forRoot({ url })],
      }).compile();

      const slackClient = module.get<IncomingWebhook>(SLACK_TOKEN);
      assert.ok(slackClient);
      assert.ok(slackClient instanceof IncomingWebhook);
    });
  });

  describe("forRootAsync", () => {
    it("provide slack client with `useFactory`", async () => {
      const module = await Test.createTestingModule({
        imports: [
          SlackModule.forRootAsync({
            useFactory: () => ({ url }),
          }),
        ],
      }).compile();

      const slackClient = module.get<IncomingWebhook>(SLACK_TOKEN);
      assert.ok(slackClient);
      assert.ok(slackClient instanceof IncomingWebhook);
    });

    it("provide slack client with `useExisting`", async () => {
      const module = await Test.createTestingModule({
        imports: [
          SlackModule.forRootAsync({
            imports: [TestModule],
            useExisting: TestService,
          }),
        ],
      }).compile();

      const slackClient = module.get<IncomingWebhook>(SLACK_TOKEN);
      assert.ok(slackClient);
      assert.ok(slackClient instanceof IncomingWebhook);
    });

    it("provide slack client with `useClass`", async () => {
      const module = await Test.createTestingModule({
        imports: [
          SlackModule.forRootAsync({
            useClass: TestService,
          }),
        ],
      }).compile();

      const slackClient = module.get<IncomingWebhook>(SLACK_TOKEN);
      assert.ok(slackClient);
      assert.ok(slackClient instanceof IncomingWebhook);
    });
  });
});
