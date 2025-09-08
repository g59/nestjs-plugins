import { describe, expect, it } from "@jest/globals";
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
      expect(slackClient).toBeDefined();
      expect(slackClient).toBeInstanceOf(IncomingWebhook);
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
      expect(slackClient).toBeDefined();
      expect(slackClient).toBeInstanceOf(IncomingWebhook);
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
      expect(slackClient).toBeDefined();
      expect(slackClient).toBeInstanceOf(IncomingWebhook);
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
      expect(slackClient).toBeDefined();
      expect(slackClient).toBeInstanceOf(IncomingWebhook);
    });
  });
});
