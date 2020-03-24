import { DynamicModule, Module } from "@nestjs/common";
import { SlackCoreModule } from "./slackCoreModule";
import { SlackOptions, SlackAsyncOptions } from "./slackOptions";

@Module({})
export class SlackModule {
  public static forRoot(options: SlackOptions): DynamicModule {
    return {
      module: SlackModule,
      imports: [SlackCoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: SlackAsyncOptions): DynamicModule {
    return {
      module: SlackModule,
      imports: [SlackCoreModule.forRootAsync(options)],
    };
  }
}
