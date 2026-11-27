import { Field, ID, ObjectType } from "@nestjs/graphql";
import { toGlobalId } from "graphql-relay";
import { Node } from "../../node/node";

@ObjectType({ implements: () => [Node] })
export class Recipe implements Node {
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date)
  creationDate: Date;

  @Field(() => [String])
  ingredients: string[];

  @Field(() => ID, { name: "id" })
  get relayId(): string {
    return toGlobalId("Recipe", this.id);
  }
}
