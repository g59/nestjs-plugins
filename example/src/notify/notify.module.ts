import { Module } from "@nestjs/common";
import { NotifyService } from "./notify.service";
import { NotifyController } from "./notify.controller";

@Module({
  providers: [NotifyService],
  controllers: [NotifyController]
})
export class NotifyModule {}
