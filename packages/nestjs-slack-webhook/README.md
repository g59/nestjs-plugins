# nestjs-slack-webhook

![Actions Status](https://github.com/g59/nestjs-plugins/workflows/Node%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/nestjs-slack-webhook.svg)](https://badge.fury.io/js/nestjs-slack-webhook)

Nest.js + [Slack Incoming Webhook](https://github.com/slackapi/node-slack-sdk/tree/master/packages/webhook)

## Install

```
npm install nestjs-slack-webhook
```

## Usage

```typescript
@Module({
  imports: [
    SlackModule.forRoot({
      url: "SLACK_WEBHOOK_URL" // ref: https://api.slack.com/messaging/webhooks#posting_with_webhooks
    })
  ]
})
export class AppModule {}
```

Inject IncomingWebhook instance

```typescript
@Injectable()
export class AppService {
  constructor(
    @InjectSlack()
    private readonly slack: IncomingWebhook
  ) {}
}
```

## Contributing

PRs accepted.

## License

[MIT](https://github.com/g59/nestjs-plugins/blob/master/LICENSE) © g59
