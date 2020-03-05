import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/models/recipe";
import { NodeResolver } from "./node.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [NodeResolver, RecipesService]
})
export class NodeModule {}
