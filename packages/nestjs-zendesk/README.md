# nestjs-zendesk

[![npm version](https://badge.fury.io/js/nestjs-zendesk.svg)](https://badge.fury.io/js/nestjs-zendesk)
[![CI](https://github.com/g59/nestjs-plugins/actions/workflows/nodejs.yml/badge.svg)](https://github.com/g59/nestjs-plugins/actions/workflows/nodejs.yml)

Zendesk API client integration for NestJS.

## Install

```sh
npm install nestjs-zendesk @nestjs/common node-zendesk
```

## Usage

Configure the client with your Zendesk account and API credentials:

```typescript
import { Module } from "@nestjs/common";
import { ZendeskModule } from "nestjs-zendesk";

@Module({
  imports: [ZendeskModule.forRoot({
    username: process.env.ZENDESK_USERNAME!,
    token: process.env.ZENDESK_TOKEN!,
    endpointUri: process.env.ZENDESK_ENDPOINT_URI!,
  })],
})
export class AppModule {}
```

Inject the client into a service:

```typescript
import { Injectable } from "@nestjs/common";
import { InjectZendesk } from "nestjs-zendesk";
import * as zendesk from "node-zendesk";

@Injectable()
export class TicketsService {
  constructor(
    @InjectZendesk() private readonly client: zendesk.ZendeskClient,
  ) {}
}
```

## API

- `ZendeskModule.forRoot(options)` and `ZendeskModule.forRootAsync(options)` configure the `node-zendesk` client.
- `@InjectZendesk()` injects the configured Zendesk client.
- See [`node-zendesk` options](https://github.com/blakmatrix/node-zendesk) for supported credentials and client settings.

## Contributing

Issues and pull requests are welcome at [g59/nestjs-plugins](https://github.com/g59/nestjs-plugins).

## License

[MIT](https://github.com/g59/nestjs-plugins/blob/main/LICENSE) © g59
