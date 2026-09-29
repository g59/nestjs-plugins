# nestjs-slack-webhook

[![npm version](https://badge.fury.io/js/nestjs-slack-webhook.svg)](https://badge.fury.io/js/nestjs-slack-webhook)
[![CI](https://github.com/g59/nestjs-plugins/actions/workflows/nodejs.yml/badge.svg)](https://github.com/g59/nestjs-plugins/actions/workflows/nodejs.yml)

Slack incoming webhook integration for NestJS.

## Install

```sh
npm install nestjs-slack-webhook @nestjs/common @slack/webhook
```

## Usage

Configure the webhook URL through an environment variable:

```typescript
import { Module } from "@nestjs/common";
import { SlackModule } from "nestjs-slack-webhook";

@Module({
  imports: [SlackModule.forRoot({ url: process.env.SLACK_WEBHOOK_URL! })],
})
export class AppModule {}
```

Inject the webhook client into a service:

```typescript
import { Injectable } from "@nestjs/common";
import { InjectSlack } from "nestjs-slack-webhook";
import { IncomingWebhook } from "@slack/webhook";

@Injectable()
export class NotificationsService {
  constructor(@InjectSlack() private readonly slack: IncomingWebhook) {}

  async notify(text: string): Promise<void> {
    await this.slack.send({ text });
  }
}
```

## API

- `SlackModule.forRoot(options)` and `SlackModule.forRootAsync(options)` configure the webhook client.
- `@InjectSlack()` injects the configured `IncomingWebhook` client.
- `options` accepts the webhook `url` and default arguments supported by `@slack/webhook`.

## Contributing

Issues and pull requests are welcome at [g59/nestjs-plugins](https://github.com/g59/nestjs-plugins).

## License

[MIT](https://github.com/g59/nestjs-plugins/blob/main/LICENSE) © g59
