import "reflect-metadata";

import { ArgsType, Field, Int } from "@nestjs/graphql";
import {
  ValidateIf,
  Validate,
  Min,
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";
import * as Relay from "graphql-relay";

@ValidatorConstraint({ async: false })
export class CannotUseWithout implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as any;
    const required = args.constraints[0] as string;
    return object[required] !== undefined;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used without \`${args.constraints[0]}\`.`;
  }
}

@ValidatorConstraint({ async: false })
export class CannotUseWith implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as any;
    const result = args.constraints.every((propertyName) => {
      return object[propertyName] === undefined;
    });
    return result;
  }

  defaultMessage(args: ValidationArguments) {
    return `Cannot be used with \`${args.constraints.join("` , `")}\`.`;
  }
}

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
  @Field(() => String, {
    nullable: true,
    description: "Paginate before opaque cursor",
  })
  @ValidateIf((o) => o.before !== undefined)
  @Validate(CannotUseWithout, ["last"])
  @Validate(CannotUseWith, ["after", "first"])
  readonly before?: Relay.ConnectionCursor;

  @Field(() => String, {
    nullable: true,
    description: "Paginate after opaque cursor",
  })
  @ValidateIf((o) => o.after !== undefined)
  @Validate(CannotUseWithout, ["first"])
  @Validate(CannotUseWith, ["before", "last"])
  readonly after?: Relay.ConnectionCursor;

  @Field(() => Int, { nullable: true, description: "Paginate first" })
  @ValidateIf((o) => o.first !== undefined)
  @Min(1)
  @Validate(CannotUseWith, ["before", "last"])
  readonly first?: number;

  @Field(() => Int, { nullable: true, description: "Paginate last" })
  @ValidateIf((o) => o.last !== undefined)
  // Required `before`. This is a weird corner case.
  // We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
  // We'll just ignore it for now.
  @Validate(CannotUseWithout, ["before"])
  @Validate(CannotUseWith, ["after", "first"])
  @Min(1)
  readonly last?: number;
}
