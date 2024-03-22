import { Controller, Get } from "@nestjs/common";
import type { IncomingWebhookSendArguments } from "@slack/webhook";
import type { NotifyService } from "./notify.service";

@Controller("notify")
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Get()
  async notifyToSlack() {
    const args: IncomingWebhookSendArguments = {
      text: "Hello Slack!",
    };
    return this.notifyService.notify(args);
  }
}
