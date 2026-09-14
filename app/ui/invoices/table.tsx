import Image from 'next/image';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
import InvoiceStatus from './status';
import { UpdateInvoice, DeleteInvoice } from './buttons';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);
  return <div className="mt-6 flow-root"><div className="inline-block min-w-full align-middle"><div className="overflow-hidden rounded-md bg-gray-50 p-2"><table className="hidden min-w-full text-gray-900 md:table"><thead className="rounded-md bg-gray-50 text-left text-sm font-normal"><tr><th className="px-4 py-5 font-medium">Customer</th><th className="px-3 py-5 font-medium">Email</th><th className="px-3 py-5 font-medium">Amount</th><th className="px-3 py-5 font-medium">Date</th><th className="px-3 py-5 font-medium">Status</th><th className="px-3 py-5 font-medium">Actions</th></tr></thead><tbody className="bg-white">{invoices.map((invoice) => <tr key={invoice.id} className="border-b py-3 text-sm last-of-type:border-none"><td className="whitespace-nowrap py-3 pl-6 pr-3"><div className="flex items-center gap-3"><Image src={invoice.image_url} className="rounded-full" alt={`${invoice.name}'s profile picture`} width={28} height={28} /><p>{invoice.name}</p></div></td><td className="whitespace-nowrap px-3 py-3">{invoice.email}</td><td className="whitespace-nowrap px-3 py-3">{formatCurrency(invoice.amount)}</td><td className="whitespace-nowrap px-3 py-3">{invoice.date.toString()}</td><td className="whitespace-nowrap px-3 py-3"><InvoiceStatus status={invoice.status} /></td><td><div className="flex justify-end gap-2 whitespace-nowrap px-6 py-4 text-sm"><UpdateInvoice id={invoice.id} /><DeleteInvoice id={invoice.id} /></div></td></tr>)}</tbody></table></div></div></div>;
}