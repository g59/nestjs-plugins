import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { afterEach, before, describe, it } from "node:test";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import { toGlobalId } from "graphql-relay";
import { AppModule } from "../src/app.module";
import { RecipesModule } from "../src/recipes/recipes.module";

describe("app (e2e)", () => {
  let app: NestFastifyApplication;

  before(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
  });

  afterEach(() => app.close());

  it("returns a recipe through both GraphQL queries", async () => {
    const id = "01234567-89ab-4def-8123-456789abcdef";
    const relayId = toGlobalId("Recipe", id);
    app
      .select(RecipesModule)
      .get(DatabaseSync, { strict: true })
      .prepare("INSERT INTO recipes (id, title) VALUES (?, ?)")
      .run(id, "Soup");

    const response = await app.inject({
      method: "POST",
      url: "/graphql",
      payload: {
        query: `query ($id: ID!) {
          recipes(first: 1) {
            edges { node { id title } }
            pageInfo { hasNextPage }
          }
          node(id: $id) { id ... on Recipe { title } }
        }`,
        variables: { id: relayId },
      },
    });

    assert.equal(response.statusCode, 200);
    const recipe = { id: relayId, title: "Soup" };
    assert.deepEqual(response.json(), {
      data: {
        recipes: {
          edges: [{ node: recipe }],
          pageInfo: { hasNextPage: false },
        },
        node: recipe,
      },
    });
  });
});
