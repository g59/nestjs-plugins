import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import type { ClassProvider } from "@nestjs/common/interfaces";
import * as zendesk from "node-zendesk";
import { ZENDESK_MODULE, ZENDESK_TOKEN } from "./zendesk.constants";
import type {
  ZendeskAsyncOptions,
  ZendeskOptionsFactory,
} from "./zendesk.interface";

function createProvider(
  options: zendesk.ZendeskClientOptions,
): Provider<zendesk.ZendeskClient> {
  return {
    provide: ZENDESK_TOKEN,
    useValue: zendesk.createClient(options),
  };
}

function createAsyncOptionsProvider({
  useFactory,
  useExisting,
  useClass,
  inject,
}: ZendeskAsyncOptions): Provider {
  if (useFactory) {
    return {
      provide: ZENDESK_MODULE,
      useFactory,
      inject,
    };
  }
  return {
    provide: ZENDESK_MODULE,
    inject: useExisting ? [useExisting] : useClass ? [useClass] : [],
    useFactory: (f: ZendeskOptionsFactory) => f.createOptions(),
  };
}

function createAsyncProviders(options: ZendeskAsyncOptions): Provider[] {
  if (options.useExisting || options.useFactory) {
    return [createAsyncOptionsProvider(options)];
  }
  return [
    createAsyncOptionsProvider(options),
    {
      provide: options.useClass,
      useClass: options.useClass,
      inject: options.inject,
    } as ClassProvider,
  ];
}

@Global()
@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: NestJS module
export class ZendeskModule {
  static forRoot(options: zendesk.ZendeskClientOptions): DynamicModule {
    const provider = createProvider(options);
    return {
      module: ZendeskModule,
      exports: [provider],
      providers: [provider],
    };
  }

  static forRootAsync(options: ZendeskAsyncOptions): DynamicModule {
    const provider: Provider<zendesk.ZendeskClient> = {
      inject: [ZENDESK_MODULE],
      provide: ZENDESK_TOKEN,
      useFactory: (options: zendesk.ZendeskClientOptions) =>
        zendesk.createClient(options),
    };

    return {
      exports: [provider],
      imports: options.imports,
      module: ZendeskModule,
      providers: [...createAsyncProviders(options), provider],
    };
  }
}
