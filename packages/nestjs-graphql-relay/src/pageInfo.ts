import { ObjectType, Field } from "@nestjs/graphql";
import type { PageInfo as IPageInfo } from "graphql-relay";

@ObjectType()
export class PageInfo implements IPageInfo {
  @Field(() => String, { nullable: true })
  readonly startCursor: string | null;
  @Field(() => String, { nullable: true })
  readonly endCursor: string | null;
  @Field(() => Boolean)
  readonly hasPreviousPage: boolean;
  @Field(() => Boolean)
  readonly hasNextPage: boolean;
}
