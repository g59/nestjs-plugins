import { registerEnumType, InputType, Field } from "@nestjs/graphql";

export enum OrderByDirection {
  ASC = "ASC",
  DESC = "DESC",
}

registerEnumType(OrderByDirection, { name: "OrderByDirection" });

@InputType()
export class OrderByInput {
  @Field(() => OrderByDirection, { nullable: true })
  createdAt?: OrderByDirection;

  @Field(() => OrderByDirection, { nullable: true })
  updatedAt?: OrderByDirection;
}
