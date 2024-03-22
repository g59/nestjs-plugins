import { Args, Field, ObjectType, Query, Resolver } from "@nestjs/graphql";
import type * as Relay from "graphql-relay";
import type { PageInfo } from "nestjs-graphql-relay";
import type { RecipesConnectionArgs } from "./dto/recipes.input";
import { Recipe } from "./models/recipe";
import type { RecipesService } from "./recipes.service";

@ObjectType({ isAbstract: true })
abstract class RecipesEdge implements Relay.Edge<Recipe> {
  @Field(() => Recipe)
  readonly node: Recipe;

  @Field()
  readonly cursor: Relay.ConnectionCursor;
}

@ObjectType()
export class RecipesConnection implements Relay.Connection<Recipe> {
  @Field()
  readonly pageInfo: PageInfo;

  @Field(() => [RecipesEdge])
  readonly edges: Array<Relay.Edge<Recipe>>;
}

@Resolver("Recipes")
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => RecipesConnection)
  recipes(
    @Args() { where, orderBy, ...args }: RecipesConnectionArgs,
  ): Promise<RecipesConnection> {
    return this.recipesService.find(where, undefined, args);
  }
}
