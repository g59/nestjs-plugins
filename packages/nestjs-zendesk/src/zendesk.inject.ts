import { Inject } from "@nestjs/common";
import { ZENDESK_TOKEN } from "./zendesk.constants";

export function InjectZendesk() {
  return Inject(ZENDESK_TOKEN);
}
