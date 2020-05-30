import { Type } from "@nestjs/common";
import { ModuleMetadata } from "@nestjs/common/interfaces";
import * as firebaseAdmin from "firebase-admin";

export interface FirebaseModuleOptions {
  googleApplicationCredential: string;
}

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
  db: firebaseAdmin.firestore.Firestore;
}
