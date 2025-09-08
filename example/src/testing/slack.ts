import { jest } from "@jest/globals";
import { Provider } from "@nestjs/common";
import { IncomingWebhook } from "@slack/webhook";
import { SLACK_TOKEN } from "nestjs-slack-webhook";

export function createSlackServiceMock(): Provider<Partial<IncomingWebhook>> {
  return {
    provide: SLACK_TOKEN,
    useValue: {
      send: jest
        .fn<IncomingWebhook["send"]>()
        .mockResolvedValue({ text: "ok" }),
    },
  };
}
