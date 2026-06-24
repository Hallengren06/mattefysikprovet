import { FieldValue } from 'firebase-admin/firestore';
import { NextResponse } from 'next/server';
import { getFirestoreDb } from '@/lib/firebase-admin';
import { createSessionCookie, getSessionCookieName, getSessionCookieOptions } from '@/lib/session';

function getFirebaseApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is not set');
  }

  return apiKey;
}

function mapFirebaseAuthError(errorMessage: string) {
  if (errorMessage === 'EMAIL_EXISTS') {
    return 'E-postadressen används redan.';
  }

  if (errorMessage.includes('WEAK_PASSWORD')) {
    return 'Lösenordet är för svagt.';
  }

  return 'Registreringen misslyckades. Försök igen.';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: string; email?: string; password?: string };

    if (!body.name || !body.email || !body.password) {
      return NextResponse.json({ message: 'Namn, e-post och lösenord krävs.' }, { status: 400 });
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${getFirebaseApiKey()}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
          returnSecureToken: true
        })
      }
    );

    const payload = (await response.json()) as {
      idToken?: string;
      localId?: string;
      email?: string;
      error?: { message?: string };
    };

    if (!response.ok || !payload.idToken || !payload.localId) {
      return NextResponse.json(
        { message: mapFirebaseAuthError(payload.error?.message ?? 'UNKNOWN') },
        { status: 400 }
      );
    }

    await getFirestoreDb().collection('users').doc(payload.localId).set({
      name: body.name,
      email: payload.email ?? body.email,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    const sessionCookie = await createSessionCookie(payload.idToken);
    const result = NextResponse.json({ success: true }, { status: 201 });

    result.cookies.set(getSessionCookieName(), sessionCookie, getSessionCookieOptions());

    return result;
  } catch (error) {
    console.error('Register error', error);
    return NextResponse.json({ message: 'Registreringen misslyckades. Försök igen.' }, { status: 500 });
  }
}
