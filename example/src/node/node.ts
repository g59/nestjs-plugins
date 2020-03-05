import { InterfaceType, Field, ID } from "type-graphql";

@InterfaceType()
export abstract class Node {
  @Field(() => ID, { name: "id" })
  readonly relayId: string;
}
