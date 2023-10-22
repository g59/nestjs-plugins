import type { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import type { ZendeskClientOptions } from "node-zendesk";

export interface ZendeskOptionsFactory {
  createOptions(): Promise<ZendeskClientOptions> | ZendeskClientOptions;
}

export interface ZendeskAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<ZendeskOptionsFactory>;
  useExisting?: Type<ZendeskOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ZendeskClientOptions> | ZendeskClientOptions;
}
