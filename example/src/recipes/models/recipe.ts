import { toGlobalId } from "graphql-relay";
import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryColumn, Column } from "typeorm";
import { Node } from "../../node/node";

@ObjectType({ implements: Node })
@Entity("recipes")
export class Recipe implements Node {
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  creationDate: Date;

  @Field(() => [String])
  ingredients: string[];

  @Field(() => ID, { name: "id" })
  get relayId(): string {
    return toGlobalId("Recipe", this.id);
  }
}
