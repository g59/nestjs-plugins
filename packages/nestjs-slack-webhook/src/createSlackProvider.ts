import { Provider } from "@nestjs/common";
import { IncomingWebhook } from "@slack/webhook";
import { SLACK_TOKEN } from "./slackConstants";
import { getSlackClient } from "./getSlackClient";
import { SlackOptions } from "./slackOptions";

export function createSlackProvider(
  options: SlackOptions
): Provider<IncomingWebhook> {
  return {
    provide: SLACK_TOKEN,
    useValue: getSlackClient(options),
  };
}
