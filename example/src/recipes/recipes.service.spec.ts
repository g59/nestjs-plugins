import { Test, TestingModule } from "@nestjs/testing";
import { RecipesService } from "./recipes.service";
import { Recipe } from "./models/recipe";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

describe("RecipesService", () => {
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesService, {
        provide: getRepositoryToken(Recipe),
        useClass: Repository,
      }],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  it("should be defined", () => expect(service).toBeDefined());
});
