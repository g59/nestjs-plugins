import { Controller, Get } from "@nestjs/common";
import { IncomingWebhookSendArguments } from "@slack/webhook";
import { NotifyService } from "./notify.service";

@Controller("notify")
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Get()
  async notifyToSlack() {
    const args: IncomingWebhookSendArguments = {
      text: "Hello Slack!"
    };
    return this.notifyService.notify(args);
  }
}
