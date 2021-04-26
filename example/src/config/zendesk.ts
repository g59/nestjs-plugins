import { registerAs } from "@nestjs/config";
import type { ClientOptions } from "node-zendesk";

export default registerAs(
  "zendesk",
  (): ClientOptions => ({
    username: process.env.ZENDESK_USER_NAME!,
    token: process.env.ZENDESK_TOKEN!,
    remoteUri: process.env.ZENDESK_REMOTE_URI!,
  })
);
