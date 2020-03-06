import { Field, ObjectType, Int } from "type-graphql";

@ObjectType({ isAbstract: true })
export abstract class Aggregate {
  @Field(() => Int)
  readonly count: number;
}
