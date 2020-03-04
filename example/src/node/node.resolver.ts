import { Resolver, Query, Args } from "@nestjs/graphql";
import { fromGlobalId } from "graphql-relay";
import { ID } from "type-graphql";
import { isUUID } from "@nestjs/common/utils/is-uuid";
import { RecipesService } from "../recipes/recipes.service";

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
