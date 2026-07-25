import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

function getRequiredClientEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
}

function getFirebaseClientConfig() {
  const projectId = getRequiredClientEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID');

  return {
    apiKey: getRequiredClientEnv('NEXT_PUBLIC_FIREBASE_API_KEY'),
    projectId,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim() || `${projectId}.firebaseapp.com`
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
