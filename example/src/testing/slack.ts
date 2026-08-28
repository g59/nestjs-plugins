import { Provider } from "@nestjs/common";
import { IncomingWebhook } from "@slack/webhook";
import { SLACK_TOKEN } from "nestjs-slack-webhook";

export function createSlackServiceMock(): Provider<Partial<IncomingWebhook>> {
  return {
    provide: SLACK_TOKEN,
    useValue: {
      send: () => Promise.resolve({ text: "ok" }),
    },
  };
}
