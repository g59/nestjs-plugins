import { ArgsType, Field, InputType } from "type-graphql";
import { ConnectionArgs, OrderByInput } from "nestjs-relay";
import { Recipe } from "../models/recipe";

@InputType()
export class RecipeWhereInput implements Partial<Recipe> {
  @Field(() => String, { nullable: true })
  readonly title?: Recipe["title"];
}

@ArgsType()
export class RecipesConnectionArgs extends ConnectionArgs {
  @Field(() => RecipeWhereInput, { nullable: true })
  readonly where?: RecipeWhereInput;

  @Field(() => OrderByInput, { nullable: true })
  readonly orderBy?: OrderByInput;
}
