import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const publicFirebaseEnv = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim(),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim(),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim()
};

function getRequiredClientEnv(name: string, value: string | undefined) {
  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
}

/**
 * authDomain is optional because most Firebase projects use the default
 * `${projectId}.firebaseapp.com` domain for browser authentication.
 */
function getFirebaseClientConfig() {
  const projectId = getRequiredClientEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', publicFirebaseEnv.projectId);

  return {
    apiKey: getRequiredClientEnv('NEXT_PUBLIC_FIREBASE_API_KEY', publicFirebaseEnv.apiKey),
    projectId,
    authDomain: publicFirebaseEnv.authDomain || `${projectId}.firebaseapp.com`
  };
}

export function getFirebaseClientApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(getFirebaseClientConfig());
}

export function getFirebaseClientAuth() {
  return getAuth(getFirebaseClientApp());
}

export const googleAuthProvider = new GoogleAuthProvider();
