import { getFirebaseAdmin } from "../src/util/getFirebaseAdmin";

describe("getFirebaseAdmin", () => {
  it("returns firebase admin client", () =>
    expect(
      getFirebaseAdmin({
        googleApplicationCredential: undefined,
      }),
    ).toBeTruthy());
});
