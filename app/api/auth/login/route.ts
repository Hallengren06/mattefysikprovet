import { NextResponse } from 'next/server';
import { createSessionCookie, getSessionCookieName, getSessionCookieOptions } from '@/lib/session';

function getFirebaseApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_FIREBASE_API_KEY is not set');
  }

  return apiKey;
}

function mapFirebaseAuthError(errorMessage: string) {
  if (errorMessage === 'EMAIL_NOT_FOUND' || errorMessage === 'INVALID_PASSWORD' || errorMessage === 'INVALID_LOGIN_CREDENTIALS') {
    return 'Fel e-post eller lösenord.';
  }

  if (errorMessage === 'USER_DISABLED') {
    return 'Kontot är inaktiverat.';
  }

  return 'Inloggningen misslyckades. Försök igen.';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json({ message: 'E-post och lösenord krävs.' }, { status: 400 });
    }

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${getFirebaseApiKey()}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    const payload = (await response.json()) as { idToken?: string; error?: { message?: string } };

    if (!response.ok || !payload.idToken) {
      return NextResponse.json(
        { message: mapFirebaseAuthError(payload.error?.message ?? 'UNKNOWN') },
        { status: 401 }
      );
    }

    const sessionCookie = await createSessionCookie(payload.idToken);
    const result = NextResponse.json({ success: true }, { status: 200 });

    result.cookies.set(getSessionCookieName(), sessionCookie, getSessionCookieOptions());

    return result;
  } catch (error) {
    console.error('Login error', error);
    return NextResponse.json({ message: 'Inloggningen misslyckades. Försök igen.' }, { status: 500 });
  }
}
