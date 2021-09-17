import * as firebaseAdmin from "firebase-admin";
import { FirebaseAdmin, FirebaseModuleOptions } from "../firebase.interface";

export const getFirebaseAdmin = ({
  googleApplicationCredential: serviceAccountPath,
  ...options
}: FirebaseModuleOptions): FirebaseAdmin => {
  const app = firebaseAdmin.initializeApp({
    credential: serviceAccountPath
      ? firebaseAdmin.credential.cert(serviceAccountPath)
      : undefined,
    ...options,
  });

  return {
    auth: app.auth(),
    messaging: app.messaging(),
    db: app.firestore(),
    storage: app.storage(),
  };
};
