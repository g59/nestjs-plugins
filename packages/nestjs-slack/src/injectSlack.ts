import { Inject } from "@nestjs/common";
import { SlackConstants } from "./slackConstants";

export function InjectSlack() {
  return Inject(SlackConstants.SLACK_TOKEN);
}
