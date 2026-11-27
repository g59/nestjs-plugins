import * as Relay from "graphql-relay";
import { ConnectionArgs } from "./connectionArgs";

export * from "./orderBy.input";
export * from "./pageInfo";
export { ConnectionArgs };

type PagingMeta =
  | { pagingType: "forward"; after?: string; first: number }
  | { pagingType: "backward"; before?: string; last: number }
  | { pagingType: "none" };

function getMeta({
  first = 0,
  last = 0,
  after,
  before,
}: ConnectionArgs): PagingMeta {
  const isForwardPaging = !!first || !!after;
  const isBackwardPaging = !!last || !!before;

  return isForwardPaging
    ? { pagingType: "forward", after, first }
    : isBackwardPaging
      ? { pagingType: "backward", before, last }
      : { pagingType: "none" };
}

/*
 * Create a 'paging parameters' object with 'limit' and 'offset' fields based on the incoming
 * cursor-paging arguments.
 */
export function getPagingParameters(args: ConnectionArgs) {
  const meta = getMeta(args);

  switch (meta.pagingType) {
    case "forward": {
      let offset = 0;
      if (meta.after) {
        offset = Relay.cursorToOffset(meta.after) + 1;
      }

      if (Number.isNaN(offset)) {
        throw new Error("invalid before query");
      }

      return {
        limit: meta.first,
        offset,
      };
    }
    case "backward": {
      const { last, before } = meta;
      let limit = last;
      let offset = Relay.cursorToOffset(before || "") - last;

      if (Number.isNaN(offset)) {
        throw new Error("invalid before query");
      }

      // Check to see if our before-page is underflowing past the 0th item
      if (offset < 0) {
        // Adjust the limit with the underflow value
        limit = Math.max(last + offset, 0);
        offset = 0;
      }

      return { offset, limit };
    }
    default:
      return {};
  }
}

export async function findAndPaginate<T>(
  connArgs: ConnectionArgs,
  loadPage: (page: {
    offset?: number;
    limit?: number;
  }) => Promise<{ nodes: readonly T[]; totalCount: number }>,
) {
  const page = getPagingParameters(connArgs);
  const { nodes, totalCount } = await loadPage(page);

  return Relay.connectionFromArraySlice(nodes, connArgs, {
    arrayLength: totalCount,
    sliceStart: page.offset ?? 0,
  });
}
