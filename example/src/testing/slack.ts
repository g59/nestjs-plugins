import { Provider } from "@nestjs/common";
import { IncomingWebhook } from "@slack/webhook";
import { SLACK_TOKEN } from "../../../packages/nestjs-slack-webhook/lib/slackConstants";

export function createSlackServiceMock(): Provider<Partial<IncomingWebhook>> {
  return {
    provide: SLACK_TOKEN,
    useValue: {
      send: jest.fn()
    }
  };
}
