import { registerAs } from "@nestjs/config";
import type { ZendeskClientOptions } from "node-zendesk";

export default registerAs(
  "zendesk",
  (): ZendeskClientOptions => ({
    username: process.env.ZENDESK_USER_NAME!,
    token: process.env.ZENDESK_TOKEN!,
    endpointUri: process.env.ZENDESK_REMOTE_URI!,
  }),
);
