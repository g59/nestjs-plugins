import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Test, TestingModule } from "@nestjs/testing";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesService } from "./recipes.service";

describe("RecipesResolver", () => {
  let resolver: RecipesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesResolver, { provide: RecipesService, useValue: {} }],
    }).compile();

    resolver = module.get<RecipesResolver>(RecipesResolver);
  });

  it("should be defined", () => assert.ok(resolver));
});
