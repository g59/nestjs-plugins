import { Test, TestingModule } from "@nestjs/testing";
import { RecipesService } from "../recipes/recipes.service";
import { createMockRepository } from "../testing/entity";
import { Recipe } from "../recipes/models/recipe";
import { NodeResolver } from "./node.resolver";

describe("NodeResolver", () => {
  let resolver: NodeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeResolver, RecipesService, createMockRepository(Recipe)],
    }).compile();

    resolver = module.get<NodeResolver>(NodeResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
