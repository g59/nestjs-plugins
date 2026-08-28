import { afterEach, describe, expect, it } from "@jest/globals";
import * as admin from "firebase-admin";
import { getFirebaseAdmin } from "../src/util/getFirebaseAdmin";

describe("getFirebaseAdmin", () => {
  afterEach(async () => {
    await Promise.all(admin.apps.map((app) => app?.delete()));
  });

  it("returns firebase admin client", () =>
    expect(
      getFirebaseAdmin({
        googleApplicationCredential: undefined,
      }),
    ).toBeTruthy());
});
