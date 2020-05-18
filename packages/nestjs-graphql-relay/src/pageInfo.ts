import { ObjectType, Field } from "@nestjs/graphql";
import * as Relay from "graphql-relay";

@ObjectType()
export class PageInfo implements Relay.PageInfo {
  @Field(() => Boolean, { nullable: true })
  readonly hasNextPage?: boolean | null;
  @Field(() => Boolean, { nullable: true })
  readonly hasPreviousPage?: boolean | null;
  @Field(() => String, { nullable: true })
  readonly startCursor?: Relay.ConnectionCursor | null;
  @Field(() => String, { nullable: true })
  readonly endCursor?: Relay.ConnectionCursor | null;
}
