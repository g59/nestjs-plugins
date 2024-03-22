import type { Provider } from "@nestjs/common";
import type { IncomingWebhook } from "@slack/webhook";
import { getSlackClient } from "./getSlackClient";
import { SLACK_TOKEN } from "./slackConstants";
import type { SlackOptions } from "./slackOptions";

export function createSlackProvider(
  options: SlackOptions,
): Provider<IncomingWebhook> {
  return {
    provide: SLACK_TOKEN,
    useValue: getSlackClient(options),
  };
}
