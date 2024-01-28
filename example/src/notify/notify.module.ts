import { Module } from "@nestjs/common";
import { NotifyController } from "./notify.controller";
import { NotifyService } from "./notify.service";

@Module({
  providers: [NotifyService],
  controllers: [NotifyController],
})
export class NotifyModule {}
