import admin from 'firebase-admin';
import { App, getApps, initializeApp } from 'firebase-admin/app';

function initializeAdmin(): App {
  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }

  // Fallback to environment variables if service account JSON is not available
  const credential = admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  });

  return initializeApp({
    credential,
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  });
}

export { initializeAdmin };
