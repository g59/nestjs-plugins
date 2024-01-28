import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recipe } from "../recipes/models/recipe";
import { RecipesService } from "../recipes/recipes.service";
import { NodeResolver } from "./node.resolver";

describe("NodeResolver", () => {
  let resolver: NodeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NodeResolver,
        RecipesService,
        {
          provide: getRepositoryToken(Recipe),
          useClass: Repository,
        },
      ],
    }).compile();

    resolver = module.get<NodeResolver>(NodeResolver);
  });

  it("should be defined", () => expect(resolver).toBeDefined());
});
