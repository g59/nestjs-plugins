import { IncomingWebhook } from "@slack/webhook";
import { SlackOptions } from "./slackOptions";

export function getSlackClient({
  url,
  ...args
}: SlackOptions): IncomingWebhook {
  const slackClient = new IncomingWebhook(url, args);
  return slackClient;
}
