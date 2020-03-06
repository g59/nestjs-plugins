# nestjs-graphql-relay

Nest.js + typeorm + graphql-relay inspired [nestjs-graphql-relay](https://github.com/kazekyo/nestjs-graphql-relay)

## Install

```
npm install nestjs-graphql-relay
```

## Usage

[example resolver](https://github.com/piic/nestjs-plugins/blob/master/example/src/recipes/recipes.resolver.ts)

```typescript
@ObjectType({ isAbstract: true })
abstract class RecipesEdge implements Relay.Edge<Recipe> {
  @Field(() => Recipe)
  readonly node!: Recipe;

  @Field()
  readonly cursor!: Relay.ConnectionCursor;
}

@ObjectType()
export class RecipesConnection implements Relay.Connection<Recipe> {
  @Field()
  readonly pageInfo!: PageInfo;

  @Field(() => [RecipesEdge])
  readonly edges!: Array<Relay.Edge<Recipe>>;

  @Field(() => Aggregate)
  readonly aggregate: Aggregate;
}
```

## Contributing

PRs accepted.

## License

[MIT](https://github.com/piic/nestjs-plugins/blob/master/LICENSE) © Piic
