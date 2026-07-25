'use client';

import type { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const SESSION_CREATION_ERROR_MESSAGE = 'Kunde inte skapa en inloggad session.';

// Produktytan är svensk, så authmeddelanden visas på svenska för användaren.
export async function createServerSession(user: User, name?: string) {
  const response = await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idToken: await user.getIdToken(),
      name
    })
  });

  if (response.ok) {
    return;
  }

  const payload = (await response.json().catch(() => ({}))) as { message?: string };
  throw new Error(payload.message ?? SESSION_CREATION_ERROR_MESSAGE);
}

export function mapAuthError(error: unknown, fallbackMessage: string) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'E-postadressen används redan.';
      case 'auth/invalid-credential':
      case 'auth/invalid-login-credentials':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Fel e-post eller lösenord.';
      case 'auth/weak-password':
        return 'Lösenordet är för svagt.';
      case 'auth/popup-blocked':
        return 'Popup-fönstret blockerades. Tillåt popup-fönster och försök igen.';
      case 'auth/popup-closed-by-user':
        return 'Google-inloggningen avbröts innan den hann slutföras.';
      case 'auth/account-exists-with-different-credential':
        return 'Det finns redan ett konto med samma e-post men en annan inloggningsmetod.';
      default:
        break;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}
