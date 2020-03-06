import { ObjectType, Field } from "type-graphql";
import * as Relay from "graphql-relay";

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field(() => Boolean, { nullable: true })
  hasNextPage?: boolean | null;
  @Field(() => Boolean, { nullable: true })
  hasPreviousPage?: boolean | null;
  @Field(() => String, { nullable: true })
  startCursor?: Relay.ConnectionCursor | null;
  @Field(() => String, { nullable: true })
  endCursor?: Relay.ConnectionCursor | null;
}
