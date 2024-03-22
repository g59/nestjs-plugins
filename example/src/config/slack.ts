import { registerAs } from "@nestjs/config";
import type { SlackOptions } from "nestjs-slack-webhook";

export default registerAs(
  "slack",
  (url = process.env["SLACK_WEBHOOK_URL"]): SlackOptions => {
    if (!url) {
      throw new Error("SLACK_WEBHOOK_URL is not defined");
    }
    return {
      url,
    };
  },
);
