import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';
import { getFirebaseAuth } from '@/lib/firebase-admin';

const SESSION_COOKIE_NAME = 'mafy_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 5;
const SESSION_EXPIRES_MS = SESSION_MAX_AGE_SECONDS * 1000;

export type SessionUser = {
  uid: string;
  email: string;
  name?: string;
};

function toSessionUser(decodedToken: { uid: string; email?: string; name?: string }): SessionUser {
  return {
    uid: decodedToken.uid,
    email: decodedToken.email ?? '',
    name: decodedToken.name
  };
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS
  };
}

export async function createSessionCookie(idToken: string) {
  return getFirebaseAuth().createSessionCookie(idToken, { expiresIn: SESSION_EXPIRES_MS });
}

export async function getRequestSessionUser(request: NextRequest): Promise<SessionUser | null> {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedToken = await getFirebaseAuth().verifySessionCookie(sessionCookie, true);
    return toSessionUser(decodedToken);
  } catch (error) {
    console.warn('Request session verification failed', error);
    return null;
  }
}

export async function getServerSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedToken = await getFirebaseAuth().verifySessionCookie(sessionCookie, true);
    return toSessionUser(decodedToken);
  } catch (error) {
    console.warn('Server session verification failed', error);
    return null;
  }
}

export async function requireServerSessionUser() {
  const user = await getServerSessionUser();

  if (!user) {
    redirect('/');
  }

  return user;
}

export function isAdminEmail(email: string) {
  const allowedEmails = (process.env.FIREBASE_ADMIN_EMAILS ?? '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(email.toLowerCase());
}
