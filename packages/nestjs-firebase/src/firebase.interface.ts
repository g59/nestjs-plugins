import type { Type } from "@nestjs/common";
import type { ModuleMetadata } from "@nestjs/common/interfaces";
import * as firebaseAdmin from "firebase-admin";
import { AppOptions } from "firebase-admin";

export type FirebaseModuleOptions = {
  googleApplicationCredential?: string | firebaseAdmin.ServiceAccount;
} & Omit<AppOptions, "credential">;

export type FirebaseModuleAsyncOptions = {
  useClass?: Type<FirebaseModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<FirebaseModuleOptions> | FirebaseModuleOptions;
  inject?: any[];
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
  storage: firebaseAdmin.storage.Storage;
}
