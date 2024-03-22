import { Injectable } from "@nestjs/common";
import type {
  IncomingWebhook,
  IncomingWebhookSendArguments,
} from "@slack/webhook";
import { InjectSlack } from "nestjs-slack-webhook";

@Injectable()
export class NotifyService {
  constructor(@InjectSlack() private readonly slack: IncomingWebhook) {}

  async notify(args: IncomingWebhookSendArguments) {
    await this.slack.send(args);
  }
}
