import type { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import type { ClientOptions } from "node-zendesk";

export interface ZendeskOptionsFactory {
  createOptions(): Promise<ClientOptions> | ClientOptions;
}

export interface ZendeskAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  inject?: any[];
  useClass?: Type<ZendeskOptionsFactory>;
  useExisting?: Type<ZendeskOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<ClientOptions> | ClientOptions;
}
