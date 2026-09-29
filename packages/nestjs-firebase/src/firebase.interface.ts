import type { FactoryProvider, ModuleMetadata, Type } from "@nestjs/common";
import type { AppOptions, ServiceAccount } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Database } from "firebase-admin/database";
import type { Firestore } from "firebase-admin/firestore";
import type { Messaging } from "firebase-admin/messaging";
import type { RemoteConfig } from "firebase-admin/remote-config";
import type { Storage } from "firebase-admin/storage";

export type FirebaseModuleOptions = {
  googleApplicationCredential?: string | ServiceAccount;
} & Omit<AppOptions, "credential">;

export type FirebaseModuleAsyncOptions = {
  useClass?: Type<FirebaseModuleOptionsFactory>;
  useFactory?: (
    ...args: unknown[]
  ) => Promise<FirebaseModuleOptions> | FirebaseModuleOptions;
  inject?: FactoryProvider<FirebaseModuleOptions>["inject"];
  useExisting?: Type<FirebaseModuleOptionsFactory>;
} & Pick<ModuleMetadata, "imports">;

export interface FirebaseModuleOptionsFactory {
  createFirebaseModuleOptions():
    | Promise<FirebaseModuleOptions>
    | FirebaseModuleOptions;
}

export interface FirebaseAdmin {
  auth: Auth;
  messaging: Messaging;
  firestore: Firestore;
  database?: Database;
  storage: Storage;
  remoteConfig: RemoteConfig;
}
