# nestjs-graphql-relay

[![npm version](https://badge.fury.io/js/nestjs-graphql-relay.svg)](https://badge.fury.io/js/nestjs-graphql-relay)
[![CI](https://github.com/g59/nestjs-plugins/actions/workflows/nodejs.yml/badge.svg)](https://github.com/g59/nestjs-plugins/actions/workflows/nodejs.yml)

Relay connection pagination helpers for NestJS GraphQL and TypeORM.

## Install

```sh
npm install nestjs-graphql-relay @nestjs/graphql @nestjs/typeorm @apollo/gateway graphql-relay typeorm class-validator ts-morph
```

## Usage

Use `findAndPaginate` with a TypeORM repository and Relay connection arguments:

```typescript
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConnectionArgs, findAndPaginate } from "nestjs-graphql-relay";
import { Repository } from "typeorm";
import { Recipe } from "./recipe.entity";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipes: Repository<Recipe>,
  ) {}

  findAll(args: ConnectionArgs) {
    return findAndPaginate({}, args, this.recipes);
  }
}
```

Pass `ConnectionArgs` from a GraphQL resolver argument decorated with `@Args()`.

## API

- `ConnectionArgs` provides Relay cursor pagination arguments.
- `findAndPaginate(condition, args, repository)` returns a Relay connection with edges and page information.
- `getPagingParameters(args)` and `OrderByInput` are available for custom pagination queries.

## Contributing

Issues and pull requests are welcome at [g59/nestjs-plugins](https://github.com/g59/nestjs-plugins).

## License

[MIT](https://github.com/g59/nestjs-plugins/blob/main/LICENSE) © g59
