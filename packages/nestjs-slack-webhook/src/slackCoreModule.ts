import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { ClassProvider } from "@nestjs/common/interfaces";
import { IncomingWebhook } from "@slack/webhook";
import { createSlackProvider } from "./createSlackProvider";
import { getSlackClient } from "./getSlackClient";
import { SLACK_MODULE, SLACK_TOKEN } from "./slackConstants";
import {
  SlackAsyncOptions,
  SlackOptions,
  SlackOptionsFactory,
} from "./slackOptions";

@Global()
@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: NestJS module
export class SlackCoreModule {
  public static forRoot(options: SlackOptions): DynamicModule {
    const provider = createSlackProvider(options);

    return {
      exports: [provider],
      module: SlackCoreModule,
      providers: [provider],
    };
  }

  static forRootAsync(options: SlackAsyncOptions): DynamicModule {
    const slackProvider: Provider<IncomingWebhook> = {
      inject: [SLACK_MODULE],
      provide: SLACK_TOKEN,
      useFactory: (slackOptions: SlackOptions) => getSlackClient(slackOptions),
    };

    return {
      exports: [slackProvider],
      imports: options.imports,
      module: SlackCoreModule,
      providers: [
        ...SlackCoreModule.createAsyncProviders(options),
        slackProvider,
      ],
    };
  }

  private static createAsyncProviders(options: SlackAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [SlackCoreModule.createAsyncOptionsProvider(options)];
    }
    return [
      SlackCoreModule.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
        inject: options.inject,
      } as ClassProvider,
    ];
  }

  private static createAsyncOptionsProvider(
    options: SlackAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        inject: options.inject ?? [],
        provide: SLACK_MODULE,
        useFactory: options.useFactory,
      };
    }
    return {
      inject: options.useExisting
        ? [options.useExisting]
        : options.useClass
          ? [options.useClass]
          : [],
      provide: SLACK_MODULE,
      useFactory: (optionsFactory: SlackOptionsFactory) =>
        optionsFactory.createSlackOptions(),
    };
  }
}
