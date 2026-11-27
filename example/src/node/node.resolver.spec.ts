import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Test, TestingModule } from "@nestjs/testing";
import { RecipesService } from "../recipes/recipes.service";
import { NodeResolver } from "./node.resolver";

describe("NodeResolver", () => {
  let resolver: NodeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeResolver, { provide: RecipesService, useValue: {} }],
    }).compile();

    resolver = module.get<NodeResolver>(NodeResolver);
  });

  it("should be defined", () => assert.ok(resolver));
});
