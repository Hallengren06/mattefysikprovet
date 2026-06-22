# mattefysikprovet

A Next.js platform for Swedish students preparing for Matematik- och fysikprovet.

## Tech Stack

- Next.js 16 (App Router, 14+ requirement satisfied)
- TypeScript
- Tailwind CSS
- PostgreSQL (`postgres` package)
- JWT auth (`jsonwebtoken`) + password hashing (`bcrypt`)

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create local env file:

   ```bash
   cp .env.example .env.local
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Project Structure

- `app/` - App Router pages, layouts, and API routes
- `components/` - Reusable UI components
- `lib/` - Database, auth, and utility helpers
- `styles/` - Global styling
- `schema.sql` - Initial PostgreSQL schema
