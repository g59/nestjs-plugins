import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import * as admin from "firebase-admin";
import { getFirebaseAdmin } from "../src/util/getFirebaseAdmin";

describe("getFirebaseAdmin", () => {
  afterEach(async () => {
    await Promise.all(admin.apps.map((app) => app?.delete()));
  });

  it("returns firebase admin client", () => {
    assert.ok(
      getFirebaseAdmin({
        googleApplicationCredential: undefined,
      }),
    );
  });
});
