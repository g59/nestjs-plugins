import { Inject } from "@nestjs/common";
import { SLACK_TOKEN } from "./slackConstants";

export function InjectSlack() {
  return Inject(SLACK_TOKEN);
}
