import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666
    `;

    return Response.json(data.rows);
  } catch (error) {
    console.error('Database Error:', error);
    return Response.json(
      { error: 'Failed to query invoice data.' },
      { status: 500 },
    );
  }
}
