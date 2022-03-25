import { Test } from "@nestjs/testing";
import { FirebaseConstants } from "./firebase.constants";
import {
  FirebaseAdmin,
  FirebaseModuleOptions,
  FirebaseModuleOptionsFactory,
} from "./firebase.interface";
import { FirebaseModule } from "./firebase.module";
import * as utils from "./util";

jest.mock("./util");
jest.spyOn(utils, "getFirebaseAdmin").mockReturnValue({} as any);

describe("FirebaseModule", () => {
  const googleApplicationCredential = "test";
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
