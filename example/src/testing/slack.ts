import type { Provider } from "@nestjs/common";
import type { IncomingWebhook } from "@slack/webhook";
import { SLACK_TOKEN } from "nestjs-slack-webhook/lib/slackConstants";

export function createSlackServiceMock(): Provider<Partial<IncomingWebhook>> {
  return {
    provide: SLACK_TOKEN,
    useValue: {
      send: jest.fn(),
    },
  };
}
