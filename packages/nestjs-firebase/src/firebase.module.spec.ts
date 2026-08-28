import assert from "node:assert/strict";
import * as path from "node:path";
import { afterEach, describe, it } from "node:test";
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
  afterEach(async () => {
    await Promise.all(admin.apps.map((app) => app?.delete()));
  });

  const googleApplicationCredential = path.join(
    process.cwd(),
    "dummy.firebase.amin.key.json",
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
      assert.ok(firebase);
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
        assert.ok(firebase);
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
        assert.ok(firebase);
      });
    });
  });
});
