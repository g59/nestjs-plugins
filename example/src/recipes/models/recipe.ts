import { Field, ID, ObjectType } from "@nestjs/graphql";
import { toGlobalId } from "graphql-relay";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Node } from "../../node/node";

@ObjectType({ implements: () => [Node] })
@Entity("recipes")
export class Recipe implements Node {
  @PrimaryColumn({ type: "varchar" })
  id: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "varchar" })
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
