# nestjs-firebase

[![npm version](https://badge.fury.io/js/nestjs-firebase.svg)](https://badge.fury.io/js/nestjs-firebase)
[![CI](https://github.com/g59/nestjs-plugins/actions/workflows/nodejs.yml/badge.svg)](https://github.com/g59/nestjs-plugins/actions/workflows/nodejs.yml)

Firebase Admin integration for NestJS.

## Install

```sh
npm install nestjs-firebase @nestjs/common firebase-admin
```

## Usage

Configure the module with a service account file path (or a service account object):

```typescript
import { Module } from "@nestjs/common";
import { FirebaseModule } from "nestjs-firebase";

@Module({
  imports: [FirebaseModule.forRoot({
    googleApplicationCredential: "path/to/service-account.json",
  })],
})
export class AppModule {}
```

Inject the Firebase Admin services where needed:

```typescript
import { Injectable } from "@nestjs/common";
import { FirebaseAdmin, InjectFirebaseAdmin } from "nestjs-firebase";

@Injectable()
export class NotificationsService {
  constructor(@InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin) {}

  async send(token: string, title: string): Promise<void> {
    await this.firebase.messaging.send({ token, notification: { title } });
  }
}
```

## API

- `FirebaseModule.forRoot(options)` and `FirebaseModule.forRootAsync(options)` configure Firebase Admin.
- `@InjectFirebaseAdmin()` injects the configured Firebase Admin services.
- Set `databaseURL` in the Firebase options to initialize Realtime Database.

## Contributing

Issues and pull requests are welcome at [g59/nestjs-plugins](https://github.com/g59/nestjs-plugins).

## License

[MIT](https://github.com/g59/nestjs-plugins/blob/main/LICENSE) © g59
