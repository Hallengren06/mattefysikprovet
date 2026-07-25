import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { getFirebaseAuth, getFirestoreDb } from '@/lib/firebase-admin';
import { createSessionCookie, getSessionCookieName, getSessionCookieOptions } from '@/lib/session';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { idToken?: string; name?: string };
    const idToken = body.idToken?.trim();

    if (!idToken) {
      return NextResponse.json({ message: 'ID-token saknas.' }, { status: 400 });
    }

    const decodedToken = await getFirebaseAuth().verifyIdToken(idToken);
    const email = decodedToken.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ message: 'E-post saknas på kontot.' }, { status: 400 });
    }

    const name = body.name?.trim() || decodedToken.name?.trim() || null;
    const userRef = getFirestoreDb().collection('users').doc(decodedToken.uid);
    const snapshot = await userRef.get();

    if (snapshot.exists) {
      await userRef.set(
        {
          email,
          ...(name ? { name } : {}),
          updatedAt: FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    } else {
      await userRef.set({
        email,
        ...(name ? { name } : {}),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
    }

    const sessionCookie = await createSessionCookie(idToken);
    const response = NextResponse.json({ success: true });

    response.cookies.set(getSessionCookieName(), sessionCookie, getSessionCookieOptions());

    return response;
  } catch (error) {
    console.error(
      'Session creation error',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return NextResponse.json({ message: 'Inloggningen misslyckades. Försök igen.' }, { status: 500 });
  }
}
