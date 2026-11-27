import { DatabaseSync } from "node:sqlite";
import { Module } from "@nestjs/common";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesService } from "./recipes.service";

@Module({
  providers: [
    {
      provide: DatabaseSync,
      useFactory: () =>
        new DatabaseSync(
          process.env.NODE_TEST_CONTEXT ? ":memory:" : "nestjs-plugins-test",
        ),
    },
    RecipesResolver,
    RecipesService,
  ],
  exports: [RecipesService],
})
export class RecipesModule {}
