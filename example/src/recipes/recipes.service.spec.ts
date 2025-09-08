import { beforeEach, describe, expect, it } from "@jest/globals";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recipe } from "./models/recipe";
import { RecipesService } from "./recipes.service";

describe("RecipesService", () => {
  let service: RecipesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: getRepositoryToken(Recipe),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
  });

  it("should be defined", () => expect(service).toBeDefined());
});
