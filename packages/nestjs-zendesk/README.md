# nestjs-zendesk

![Actions Status](https://github.com/g59/nestjs-plugins/workflows/Node%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/nestjs-zendesk.svg)](https://badge.fury.io/js/nestjs-zendesk)

## Install

```
npm install nestjs-zendesk
```

## Usage

```typescript
import * as zendesk from "node-zendesk";

@Module({
  imports: [
    zendeskModule.forRoot({
      username: "name",
      token: "token",
      remoteUri: "http://example.com",
    }),
  ],
})
export class AppModule {}

// using in service class
export class Service {
  constructor(@InjectZendesk() private readonly zendesk: zendesk.Client) {}
}
```

## Contributing

PRs accepted.

## License

[MIT](https://github.com/g59/nestjs-plugins/blob/main/LICENSE) © g59
