import { Test, TestingModule } from "@nestjs/testing";
import { NodeResolver } from "./node.resolver";

describe("NodeResolver", () => {
  let resolver: NodeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeResolver]
    }).compile();

    resolver = module.get<NodeResolver>(NodeResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
