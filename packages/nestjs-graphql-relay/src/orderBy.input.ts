import { Field, InputType, registerEnumType } from "@nestjs/graphql";

export enum OrderByDirection {
  ASC = "ASC",
  DESC = "DESC",
}

registerEnumType(OrderByDirection, { name: "OrderByDirection" });

@InputType()
export class OrderByInput {
  @Field(() => OrderByDirection, { nullable: true })
  readonly createdAt?: OrderByDirection;

  @Field(() => OrderByDirection, { nullable: true })
  readonly updatedAt?: OrderByDirection;
}
