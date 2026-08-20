import * as path from "node:path";
import { describe, expect, it, jest } from "@jest/globals";
import { Test } from "@nestjs/testing";
import * as admin from "firebase-admin";
import { FirebaseConstants } from "./firebase.constants";
import {
  FirebaseAdmin,
  FirebaseModuleOptions,
  FirebaseModuleOptionsFactory,
} from "./firebase.interface";
import { FirebaseModule } from "./firebase.module";

describe("FirebaseModule", () => {
  const firebaseApp = {
    auth: jest.fn(() => ({}) as admin.auth.Auth),
    database: jest.fn(() => ({}) as admin.database.Database),
    firestore: jest.fn(() => ({}) as admin.firestore.Firestore),
    messaging: jest.fn(() => ({}) as admin.messaging.Messaging),
    remoteConfig: jest.fn(() => ({}) as admin.remoteConfig.RemoteConfig),
    storage: jest.fn(() => ({}) as admin.storage.Storage),
  } as unknown as admin.app.App;

  jest.spyOn(admin, "initializeApp").mockReturnValue(firebaseApp);

  const googleApplicationCredential = path.join(
    __dirname,
    "../../../dummy.firebase.amin.key.json",
  );
  class TestService implements FirebaseModuleOptionsFactory {
    createFirebaseModuleOptions(): FirebaseModuleOptions {
      return {
        googleApplicationCredential,
      };
    }
  }

  describe("forRoot", () => {
    it("should provide the firebase admin", async () => {
      const module = await Test.createTestingModule({
        imports: [FirebaseModule.forRoot({ googleApplicationCredential })],
      }).compile();

      const firebase = module.get<FirebaseAdmin>(
        FirebaseConstants.FIREBASE_TOKEN,
      );
      expect(firebase).toBeDefined();
    });
  });

  describe("forRootAsync", () => {
    describe("when the `useFactory` option is used", () => {
      it("should provide the firebase admin", async () => {
        const module = await Test.createTestingModule({
          imports: [
            FirebaseModule.forRootAsync({
              useFactory: () => ({ googleApplicationCredential }),
            }),
          ],
        }).compile();

        const firebase = module.get<FirebaseAdmin>(
          FirebaseConstants.FIREBASE_TOKEN,
        );
        expect(firebase).toBeDefined();
      });
    });
    describe("when the `useClass` option is used", () => {
      it("should provide firebase admin", async () => {
        const module = await Test.createTestingModule({
          imports: [
            FirebaseModule.forRootAsync({
              useClass: TestService,
            }),
          ],
        }).compile();

        const firebase = module.get<FirebaseAdmin>(
          FirebaseConstants.FIREBASE_TOKEN,
        );
        expect(firebase).toBeDefined();
      });
    });
  });
});
