import { describe, expect, it } from "@jest/globals";
import { getFirebaseAdmin } from "../src/util/getFirebaseAdmin";

describe("getFirebaseAdmin", () => {
  it("returns firebase admin client", () =>
    expect(
      getFirebaseAdmin({
        googleApplicationCredential: undefined,
      }),
    ).toBeTruthy());
});
