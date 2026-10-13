# Next.js Dashboard

This project contains the Next.js Learn Dashboard through Chapter 10. The
dashboard, invoices, and customers routes are public and use server-side
PostgreSQL queries. Invoice search, pagination, mutations, and authentication
are not included.

## Setup

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local` and set `POSTGRES_URL` to your
   PostgreSQL connection string. Keep the credentials private.
3. Start the application with `pnpm dev`.
4. Visit `/seed` once to create and populate the `customers`, `invoices`, and
   `revenue` tables. The seed uses the existing records where possible and
   does not drop tables or delete data.
5. Visit `/query` to test the invoice query. Dashboard and data pages require
   a reachable database.

The overview uses dynamic server-side data fetching with independent Suspense
boundaries and loading skeletons. The project uses Next.js 14.2.35; Partial
Prerendering is not enabled because it is experimental and the stable
Next.js 14 documentation requires a canary release for that feature.
