import { beforeEach, describe, expect, it } from "@jest/globals";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recipe } from "./models/recipe";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesService } from "./recipes.service";

describe("RecipesResolver", () => {
  let resolver: RecipesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesResolver,
        RecipesService,
        {
          provide: getRepositoryToken(Recipe),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<RecipesResolver>(RecipesResolver);
  });

  it("should be defined", () => expect(resolver).toBeDefined());
});
