import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { offsetToCursor } from "graphql-relay";
import { findAndPaginate, getPagingParameters } from "../src";

describe("getPagingParameters", () => {
  it("handles omitted arguments and rejects invalid cursors", () => {
    assert.deepEqual(getPagingParameters({}), {});
    assert.deepEqual(getPagingParameters({ first: 1 }), {
      limit: 1,
      offset: 0,
    });
    assert.throws(
      () => getPagingParameters({ first: 1, after: "after" }),
      /invalid before query/,
    );
    assert.throws(
      () => getPagingParameters({ last: 1, before: "before" }),
      /invalid before query/,
    );
  });
});

describe("findAndPaginate", () => {
  it("returns an empty connection for an empty result", async () => {
    const result = await findAndPaginate({}, async (page) => {
      assert.deepEqual(page, {});
      return { nodes: [], totalCount: 0 };
    });
    assert.deepEqual(result, {
      edges: [],
      pageInfo: {
        endCursor: null,
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
      },
    });
  });

  const nodes = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }];
  const expectedEdges = [
    { node: nodes[1], cursor: offsetToCursor(1) },
    { node: nodes[2], cursor: offsetToCursor(2) },
  ];

  it("loads a forward page and uses the total count for page info", async () => {
    const result = await findAndPaginate(
      { first: 2, after: offsetToCursor(0) },
      async (page) => {
        assert.deepEqual(page, { limit: 2, offset: 1 });
        return { nodes: nodes.slice(1, 3), totalCount: nodes.length };
      },
    );
    assert.deepEqual(result.edges, expectedEdges);
    assert.equal(result.pageInfo.startCursor, offsetToCursor(1));
    assert.equal(result.pageInfo.endCursor, offsetToCursor(2));
    assert.equal(result.pageInfo.hasNextPage, true);
  });

  it("loads a backward page in the same order as a forward page", async () => {
    const result = await findAndPaginate(
      { last: 2, before: offsetToCursor(3) },
      async (page) => {
        assert.deepEqual(page, { limit: 2, offset: 1 });
        return { nodes: nodes.slice(1, 3), totalCount: nodes.length };
      },
    );
    assert.deepEqual(result.edges, expectedEdges);
    assert.equal(result.pageInfo.hasPreviousPage, true);
  });
});
