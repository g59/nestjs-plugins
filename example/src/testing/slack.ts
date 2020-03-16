import { SLACK_TOKEN } from "nestjs-slack/lib/slackConstants";
import { Provider } from "@nestjs/common";
import { IncomingWebhook } from "@slack/webhook";

export function createSlackServiceMock(): Provider<Partial<IncomingWebhook>> {
  return {
    provide: SLACK_TOKEN,
    useValue: {
      send: jest.fn()
    }
  };
}
