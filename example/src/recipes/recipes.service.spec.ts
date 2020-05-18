import { Test, TestingModule } from "@nestjs/testing";
import { createMockRepository } from "../testing/entity";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./models/recipe";

describe("RecipesService", () => {
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesService, createMockRepository(Recipe)],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  it("should be defined", () => expect(service).toBeDefined());
});
