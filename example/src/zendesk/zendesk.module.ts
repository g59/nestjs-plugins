import { Module } from "@nestjs/common";
import { ZendeskService } from "./zendesk.service";

@Module({
  providers: [ZendeskService],
})
export class ZendeskModule {}
