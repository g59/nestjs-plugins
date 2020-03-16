import { InterfaceType, Field, ID } from "@nestjs/graphql";

@InterfaceType()
export abstract class Node {
  @Field(() => ID, { name: "id" })
  readonly relayId: string;
}
