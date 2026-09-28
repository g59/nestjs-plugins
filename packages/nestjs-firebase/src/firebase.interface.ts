import type { FactoryProvider, ModuleMetadata, Type } from "@nestjs/common";
import * as firebaseAdmin from "firebase-admin";
import { AppOptions } from "firebase-admin";

export type FirebaseModuleOptions = {
  googleApplicationCredential?: string | firebaseAdmin.ServiceAccount;
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
  auth: firebaseAdmin.auth.Auth;
  messaging: firebaseAdmin.messaging.Messaging;
  firestore: firebaseAdmin.firestore.Firestore;
  database?: firebaseAdmin.database.Database;
  storage: firebaseAdmin.storage.Storage;
  remoteConfig: firebaseAdmin.remoteConfig.RemoteConfig;
}
