import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { it } from "node:test";
import { Test } from "@nestjs/testing";
import { fromGlobalId, offsetToCursor } from "graphql-relay";
import { RecipesModule } from "./recipes.module";
import { RecipesService } from "./recipes.service";

it("reads an existing recipes file and pages the filtered rows", async (t) => {
  const directory = mkdtempSync(join(tmpdir(), "recipes-test-"));
  const path = join(directory, "recipes");
  const existing = new DatabaseSync(path);
  existing.exec(`
    CREATE TABLE "recipes" (
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "description" varchar
    );
    INSERT INTO "recipes" VALUES
      ('b', 'Baker''s bread', NULL),
      ('a', 'Baker''s bread', 'A description'),
      ('c', 'Soup', NULL);
  `);
  existing.close();
  t.after(() => rmSync(directory, { recursive: true, force: true }));

  const database = new DatabaseSync(path);
  const module = await Test.createTestingModule({ imports: [RecipesModule] })
    .overrideProvider(DatabaseSync)
    .useValue(database)
    .compile();
  await module.init();
  t.after(() => module.close());

  const service = module.get(RecipesService);
  const first = await service.find({ title: "Baker's bread" }, { first: 1 });
  assert.deepEqual(
    first.edges.map(({ node }) => node.id),
    ["b"],
  );
  assert.equal(first.pageInfo.hasNextPage, true);

  const next = await service.find(
    { title: "Baker's bread" },
    { first: 1, after: offsetToCursor(0) },
  );
  assert.deepEqual(
    next.edges.map(({ node }) => node.id),
    ["a"],
  );
  assert.equal(next.pageInfo.hasNextPage, false);

  const recipe = await service.findById("a");
  assert.equal(recipe.description, "A description");
  assert.deepEqual(fromGlobalId(recipe.relayId), { type: "Recipe", id: "a" });
  await assert.rejects(() => service.findById("missing"), /Recipe not found/);
});
