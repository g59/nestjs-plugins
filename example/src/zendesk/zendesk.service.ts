import { Injectable } from "@nestjs/common";
import { InjectZendesk } from "nestjs-zendesk";
import type { ZendeskClient } from "node-zendesk";

@Injectable()
export class ZendeskService {
  constructor(@InjectZendesk() private readonly zendesk: ZendeskClient) {}

  async ticket() {
    return this.zendesk.tickets.list();
  }
}
