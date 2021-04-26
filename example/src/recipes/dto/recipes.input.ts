import { ConnectionArgs, OrderByInput } from "nestjs-graphql-relay";
import {
  InputType,
  Field,
  ArgsType,
  PartialType,
  PickType,
} from "@nestjs/graphql";
import { Recipe } from "../models/recipe";

@InputType()
export class RecipeWhereInput extends PartialType(
  PickType(Recipe, ["title"], InputType)
) {}

@ArgsType()
export class RecipesConnectionArgs extends ConnectionArgs {
  @Field(() => RecipeWhereInput, { nullable: true })
  readonly where?: RecipeWhereInput;

  @Field(() => OrderByInput, { nullable: true })
  readonly orderBy?: OrderByInput;
}
