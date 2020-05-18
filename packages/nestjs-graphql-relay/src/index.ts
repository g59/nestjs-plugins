import * as Relay from "graphql-relay";
import { FindManyOptions, Repository } from "typeorm";
import { ConnectionArgs } from "./connectionArgs";

export { ConnectionArgs };
export * from "./pageInfo";
export * from "./orderBy.input";

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

      if (isNaN(offset)) {
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
      let offset = Relay.cursorToOffset(before!) - last;

      if (isNaN(offset)) {
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
  condition: FindManyOptions<T>,
  connArgs: ConnectionArgs,
  repository: Repository<T>
) {
  const { limit, offset } = getPagingParameters(connArgs);
  const [entities, count] = await repository.findAndCount({
    ...condition,
    skip: offset,
    take: limit,
  });

  return Relay.connectionFromArraySlice(entities, connArgs, {
    arrayLength: count,
    sliceStart: offset || 0,
  });
}
