# mattefysikprovet

A Next.js platform for Swedish students preparing for Matematik- och fysikprovet.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Firebase Authentication (email/password)
- Firestore (user data + test results)

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create local env file:

   ```bash
   cp .env.example .env.local
   ```

3. Fill in Firebase values in `.env.local`:

   - `NEXT_PUBLIC_FIREBASE_API_KEY` and `NEXT_PUBLIC_FIREBASE_PROJECT_ID` from Firebase Web app settings
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` only if you need a custom auth domain; otherwise the app falls back to `<NEXT_PUBLIC_FIREBASE_PROJECT_ID>.firebaseapp.com`
   - `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` from a Firebase service account key
   - `FIREBASE_ADMIN_EMAILS` as comma-separated emails allowed to access `/admin`

4. Start development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Firebase Configuration

- Enable **Authentication → Email/Password** and **Authentication → Google** in Firebase console.
- Create a **Firestore database** in production mode.
- Deploy Firestore rules from `firestore.rules`.

## Vercel Deployment

1. Import the GitHub repository in Vercel.
2. Add all environment variables from `.env.example` in Vercel Project Settings.
3. Redeploy.

## Project Structure

- `app/` - App Router pages, layouts, and API routes
- `components/` - Reusable UI components
- `lib/` - Firebase/session helpers and utilities
- `styles/` - Global styling
- `firestore.rules` - Firestore access rules
