import { Module } from "@nestjs/common";
import { NodeResolver } from "./node.resolver";

@Module({
  providers: [NodeResolver]
})
export class NodeModule {}
