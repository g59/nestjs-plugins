import { Inject } from "@nestjs/common";
import { Args, Field, ObjectType, Query, Resolver } from "@nestjs/graphql";
import * as Relay from "graphql-relay";
import { PageInfo } from "nestjs-graphql-relay";
import { RecipesConnectionArgs } from "./dto/recipes.input";
import { Recipe } from "./models/recipe";
import { RecipesService } from "./recipes.service";

@ObjectType({ isAbstract: true })
abstract class RecipesEdge implements Relay.Edge<Recipe> {
  @Field(() => Recipe)
  readonly node: Recipe;

  @Field(() => String)
  readonly cursor: Relay.ConnectionCursor;
}

@ObjectType()
export class RecipesConnection implements Relay.Connection<Recipe> {
  @Field(() => PageInfo)
  readonly pageInfo: PageInfo;

  @Field(() => [RecipesEdge])
  readonly edges: Array<Relay.Edge<Recipe>>;
}

@Resolver("Recipes")
export class RecipesResolver {
  constructor(
    @Inject(RecipesService) private readonly recipesService: RecipesService,
  ) {}

  @Reflect.metadata("design:paramtypes", [RecipesConnectionArgs])
  @Query(() => RecipesConnection)
  recipes(
    @Args({ type: () => RecipesConnectionArgs })
    { where, orderBy, ...args }: RecipesConnectionArgs,
  ): Promise<RecipesConnection> {
    return this.recipesService.find(where, undefined, args);
  }
}
