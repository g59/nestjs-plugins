import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { fromGlobalId } from "graphql-relay";
import { isUUID } from "@nestjs/common/utils/is-uuid";
import { RecipesService } from "../recipes/recipes.service";
import { Node } from "../node/node";

@Resolver()
export class NodeResolver {
  constructor(private readonly recipes: RecipesService) {}

  @Query(() => Node, { nullable: true })
  async node(@Args({ name: "id", type: () => ID }) relayId: string) {
    const { id, type } = fromGlobalId(relayId);
    if (!isUUID(id)) {
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
