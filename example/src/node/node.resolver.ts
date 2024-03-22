import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { fromGlobalId } from "graphql-relay";
import * as uuid from "uuid";
import { Node } from "../node/node";
import type { RecipesService } from "../recipes/recipes.service";

@Resolver()
export class NodeResolver {
  constructor(private readonly recipes: RecipesService) {}

  @Query(() => Node, { nullable: true })
  async node(@Args({ name: "id", type: () => ID }) relayId: string) {
    const { id, type } = fromGlobalId(relayId);
    if (!uuid.validate(id)) {
      return null;
    }
    switch (type) {
      case "Recipe":
        return this.recipes.findById(id);
      default:
        break;
    }
    return null;
  }
}
