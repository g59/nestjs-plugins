
import { getFirebaseAdmin } from "../src/util/getFirebaseAdmin"


describe("getFirebaseAdmin", () => {
    it("returns firebase admin client", () => {
        const  firebase = getFirebaseAdmin({
            googleApplicationCredential: undefined
        });
        expect(firebase).toBeTruthy();
    })
});