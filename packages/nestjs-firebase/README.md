# nestjs-firebase

![Actions Status](https://github.com/g59/nestjs-plugins/workflows/Node%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/nestjs-firebase.svg)](https://badge.fury.io/js/nestjs-firebase)

## Install

```
npm install nestjs-firebase
```

## Usage

```typescript
@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: "path/to/credential file.json",
    }),
  ],
})
export class AppModule {}

// using in service class
export class Service {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}
}
```

## Contributing

PRs accepted.

## License

[MIT](https://github.com/g59/nestjs-plugins/blob/main/LICENSE) © g59
