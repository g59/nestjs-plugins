import * as admin from "firebase-admin";
import { FirebaseAdmin, FirebaseModuleOptions } from "../firebase.interface";

const createInstances = (
  app: admin.app.App,
  initDatabase = false,
): FirebaseAdmin => ({
  auth: app.auth(),
  messaging: app.messaging(),
  firestore: app.firestore(),
  database: initDatabase ? app.database() : undefined,
  storage: app.storage(),
  remoteConfig: app.remoteConfig(),
});

export const getFirebaseAdmin = (
  options?: FirebaseModuleOptions,
): FirebaseAdmin => {
  if (!options || Object.values(options).filter((v) => !!v).length === 0) {
    return createInstances(admin.initializeApp());
  }
  const { googleApplicationCredential: serviceAccountPath, ...appOptions } =
    options;
  return createInstances(
    admin.initializeApp({
      credential: serviceAccountPath
        ? admin.credential.cert(serviceAccountPath)
        : undefined,
      ...appOptions,
    }),
    !!appOptions.databaseURL,
  );
};
