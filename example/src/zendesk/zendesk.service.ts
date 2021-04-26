import { Injectable } from "@nestjs/common";
import { InjectZendesk } from "nestjs-zendesk";
import { Client } from "node-zendesk";

@Injectable()
export class ZendeskService {
  constructor(@InjectZendesk() private readonly zendesk: Client) {}

  async ticket() {
    return this.zendesk.tickets.list();
  }
}
