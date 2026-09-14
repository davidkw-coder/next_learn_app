import postgres from 'postgres';
import { CardData, CustomerField, FormattedCustomersTable, InvoiceForm, LatestInvoice, Revenue } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
const ITEMS_PER_PAGE = 6;

export async function fetchRevenue(): Promise<Revenue[]> {
  return sql<Revenue[]>`SELECT * FROM revenue`;
}

export async function fetchLatestInvoices(): Promise<LatestInvoice[]> {
  return sql<LatestInvoice[]>`SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id FROM invoices JOIN customers ON invoices.customer_id = customers.id ORDER BY invoices.date DESC LIMIT 5`;
}

export async function fetchCardData(): Promise<CardData> {
  const data = await sql<CardData[]>`SELECT COUNT(invoices.id) AS "numberOfInvoices", COUNT(customers.id) AS "numberOfCustomers", SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS "totalPaidInvoices", SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS "totalPendingInvoices" FROM invoices, customers`;
  return data[0];
}

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  return sql`SELECT invoices.id, invoices.amount, invoices.date, invoices.status, customers.name, customers.email, customers.image_url FROM invoices JOIN customers ON invoices.customer_id = customers.id WHERE customers.name ILIKE ${`%${query}%`} OR customers.email ILIKE ${`%${query}%`} ORDER BY invoices.date DESC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
}

export async function fetchInvoicesPages(query: string) {
  const data = await sql<{ count: number }[]>`SELECT COUNT(*) FROM invoices JOIN customers ON invoices.customer_id = customers.id WHERE customers.name ILIKE ${`%${query}%`} OR customers.email ILIKE ${`%${query}%`}`;
  return Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
}

export async function fetchInvoiceById(id: string): Promise<InvoiceForm | undefined> {
  const data = await sql<InvoiceForm[]>`SELECT id, customer_id, amount, status FROM invoices WHERE id = ${id}`;
  return data[0];
}

export async function fetchCustomers(): Promise<CustomerField[]> {
  return sql<CustomerField[]>`SELECT id, name FROM customers ORDER BY name ASC`;
}

export async function fetchFilteredCustomers(query: string): Promise<FormattedCustomersTable[]> {
  return sql<FormattedCustomersTable[]>`SELECT customers.id, customers.name, customers.email, customers.image_url, COUNT(invoices.id) AS total_invoices, SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending, SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid FROM customers LEFT JOIN invoices ON customers.id = invoices.customer_id WHERE customers.name ILIKE ${`%${query}%`} OR customers.email ILIKE ${`%${query}%`} GROUP BY customers.id, customers.name, customers.email, customers.image_url ORDER BY customers.name ASC`;
}

