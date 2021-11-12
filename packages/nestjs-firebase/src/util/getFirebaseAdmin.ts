import * as firebaseAdmin from 'firebase-admin';
import { AppOptions } from 'firebase-admin';
import { FirebaseAdmin, FirebaseModuleOptions } from '../firebase.interface';

export const getFirebaseAdmin = ({
  googleApplicationCredential: serviceAccountPath,
  ...options
}: FirebaseModuleOptions): FirebaseAdmin => {
  const firebaseAdminOptions: AppOptions = options || {};
  if (serviceAccountPath) {
    firebaseAdminOptions.credential =
      firebaseAdmin.credential.cert(serviceAccountPath);
  }
  const isOptionsNotEmpty = Object.keys(options).length > 0;

  const app = firebaseAdmin.initializeApp(
    isOptionsNotEmpty ? firebaseAdminOptions : undefined,
  );

  return {
    auth: app.auth(),
    messaging: app.messaging(),
    db: app.firestore(),
    storage: app.storage(),
  };
};
