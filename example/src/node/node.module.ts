import { Module } from "@nestjs/common";
import { RecipesModule } from "../recipes/recipes.module";
import { NodeResolver } from "./node.resolver";

@Module({
  imports: [RecipesModule],
  providers: [NodeResolver],
})
export class NodeModule {}
