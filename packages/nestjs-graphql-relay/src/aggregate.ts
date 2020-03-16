import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType({ isAbstract: true })
export abstract class Aggregate {
  @Field(() => Int)
  readonly count: number;
}
