import postgres from 'postgres';
import { invoices, customers, revenue } from '../lib/placeholder-data';

type Transaction = Parameters<
  Parameters<ReturnType<typeof postgres>['begin']>[1]
>[0];

const sql = process.env.POSTGRES_URL
  ? postgres(process.env.POSTGRES_URL, { ssl: 'require' })
  : undefined;

async function seedInvoices(sql: Transaction) {
  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  return Promise.all(
    invoices.map((invoice) => sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      SELECT ${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date}
      WHERE NOT EXISTS (
        SELECT 1
        FROM invoices
        WHERE customer_id = ${invoice.customer_id}
          AND amount = ${invoice.amount}
          AND status = ${invoice.status}
          AND date = ${invoice.date}
      );
    `),
  );
}

async function seedCustomers(sql: Transaction) {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  const insertedCustomers = await Promise.all(
    customers.map(
      (customer) => sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCustomers;
}

async function seedRevenue(sql: Transaction) {
  await sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!sql) {
    return Response.json(
      { error: 'POSTGRES_URL must be configured before seeding the database.' },
      { status: 503 },
    );
  }

  try {
    await sql.begin(async (transaction) => {
      await seedCustomers(transaction);
      await seedInvoices(transaction);
      await seedRevenue(transaction);
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Database seed error:', error);
    return Response.json(
      { error: 'Failed to seed the database.' },
      { status: 500 },
    );
  }
}
