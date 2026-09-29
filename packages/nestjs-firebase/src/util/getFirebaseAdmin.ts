import { App, cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import { getRemoteConfig } from "firebase-admin/remote-config";
import { getStorage } from "firebase-admin/storage";
import { FirebaseAdmin, FirebaseModuleOptions } from "../firebase.interface";

const createInstances = (app: App, initDatabase = false): FirebaseAdmin => ({
  auth: getAuth(app),
  messaging: getMessaging(app),
  firestore: getFirestore(app),
  database: initDatabase ? getDatabase(app) : undefined,
  storage: getStorage(app),
  remoteConfig: getRemoteConfig(app),
});

export const getFirebaseAdmin = (
  options?: FirebaseModuleOptions,
): FirebaseAdmin => {
  if (!options || Object.values(options).filter((v) => !!v).length === 0) {
    return createInstances(initializeApp());
  }
  const { googleApplicationCredential: serviceAccountPath, ...appOptions } =
    options;
  return createInstances(
    initializeApp({
      ...appOptions,
      ...(serviceAccountPath ? { credential: cert(serviceAccountPath) } : {}),
    }),
    !!appOptions.databaseURL,
  );
};
