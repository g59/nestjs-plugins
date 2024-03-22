import { IncomingWebhook } from "@slack/webhook";
import type { SlackOptions } from "./slackOptions";

export function getSlackClient({
  url,
  ...args
}: SlackOptions): IncomingWebhook {
  const slackClient = new IncomingWebhook(url, args);
  return slackClient;
}
