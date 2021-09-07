import { Inject } from "@nestjs/common";
import { FirebaseConstants } from "./firebase.constants";

export function InjectFirebaseAdmin() {
  return Inject(FirebaseConstants.FIREBASE_TOKEN);
}
