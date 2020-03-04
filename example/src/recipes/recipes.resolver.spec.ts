import { Test, TestingModule } from "@nestjs/testing";
import { createMockRepository } from "../testing/entity";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./models/recipe";

describe("RecipesResolver", () => {
  let resolver: RecipesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesResolver, RecipesService, createMockRepository(Recipe)]
    }).compile();

    resolver = module.get<RecipesResolver>(RecipesResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
