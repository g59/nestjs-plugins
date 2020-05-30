import * as firebaseAdmin from "firebase-admin";

import { FirebaseModuleOptions, FirebaseAdmin } from "../firebase.interface";

export const getFirebaseAdmin = (
  options: FirebaseModuleOptions
): FirebaseAdmin => {
  const app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      options.googleApplicationCredential
    ),
  });

  return {
    auth: app.auth(),
    messaging: app.messaging(),
    db: app.firestore(),
  };
};
