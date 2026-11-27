# nestjs-graphql-relay

[![npm version](https://badge.fury.io/js/nestjs-graphql-relay.svg)](https://badge.fury.io/js/nestjs-graphql-relay)
[![CI](https://github.com/g59/nestjs-plugins/actions/workflows/nodejs.yml/badge.svg)](https://github.com/g59/nestjs-plugins/actions/workflows/nodejs.yml)

Relay connection pagination helpers for NestJS GraphQL.

## Install

```sh
npm install nestjs-graphql-relay @nestjs/graphql @apollo/gateway graphql-relay class-validator ts-morph
```

## Usage

Pass Relay connection arguments and an async function that loads the requested page.

```typescript
import { ConnectionArgs, findAndPaginate } from "nestjs-graphql-relay";

const recipes = [{ id: "recipe-1" }, { id: "recipe-2" }];

function findAll(args: ConnectionArgs) {
  return findAndPaginate(
    args,
    async ({ offset = 0, limit = recipes.length }) => ({
      nodes: recipes.slice(offset, offset + limit),
      totalCount: recipes.length,
    }),
  );
}
```

Pass `ConnectionArgs` from a GraphQL resolver argument decorated with `@Args()`.
Return rows in a consistent order for forward and backward pages. Apply the same
filters to the page and the total count, and count all matching rows before
applying the offset and limit.

## API

- `ConnectionArgs` provides Relay cursor pagination arguments.
- `findAndPaginate(args, loadPage)` returns a Relay connection with edges and page information.
- `getPagingParameters(args)` and `OrderByInput` are available for custom pagination queries.

## Migrating from the TypeORM helper

Move the repository query into the page loader. Install `@nestjs/typeorm` and
`typeorm` directly in your application if it uses them.

```typescript
return findAndPaginate(args, async ({ offset, limit }) => {
  const [nodes, totalCount] = await repository.findAndCount({
    ...condition,
    skip: offset,
    take: limit,
  });
  return { nodes, totalCount };
});
```

## Contributing

Issues and pull requests are welcome at [g59/nestjs-plugins](https://github.com/g59/nestjs-plugins).

## License

[MIT](https://github.com/g59/nestjs-plugins/blob/main/LICENSE) © g59
