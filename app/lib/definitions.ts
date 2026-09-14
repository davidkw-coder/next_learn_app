export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string; // Will be created on the database
  customer_id: string;
  amount: number; // Stored in cents
  status: 'pending' | 'paid';
  date: string;
};

export type Revenue = { month: string; revenue: number };
export type LatestInvoice = { id: string; name: string; image_url: string; email: string; amount: string };
export type CardData = { numberOfInvoices: number; numberOfCustomers: number; totalPaidInvoices: string; totalPendingInvoices: string };
export type InvoiceForm = { id: string; customer_id: string; amount: number; status: 'pending' | 'paid' };
export type CustomerField = { id: string; name: string };
export type FormattedCustomersTable = Customer & { total_invoices: number; total_pending: string; total_paid: string };

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};