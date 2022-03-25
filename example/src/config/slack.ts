import { SlackOptions } from "nestjs-slack-webhook";
import { registerAs } from "@nestjs/config";

export default registerAs(
  "slack",
  (): SlackOptions => ({
    url: process.env.SLACK_WEBHOOK_URL!,
  }),
);
