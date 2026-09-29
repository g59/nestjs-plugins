import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { deleteApp, getApps } from "firebase-admin/app";
import { getFirebaseAdmin } from "../src/util/getFirebaseAdmin";

describe("getFirebaseAdmin", () => {
  afterEach(async () => {
    await Promise.all(getApps().map(deleteApp));
  });

  it("returns firebase admin client", () => {
    assert.ok(
      getFirebaseAdmin({
        googleApplicationCredential: undefined,
      }),
    );
  });

  it("initializes the database when a database URL is configured", () => {
    const firebase = getFirebaseAdmin({
      databaseURL: "https://example-default-rtdb.firebaseio.com",
    });

    assert.ok(firebase.database);
    assert.ok(firebase.auth);
    assert.ok(firebase.firestore);
  });
});
