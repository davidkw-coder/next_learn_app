import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';
 
export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();
 
  return <div className="flex w-full flex-col rounded-xl bg-gray-50 p-4 md:col-span-4"><h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2><div className="flex grow flex-col justify-between">{latestInvoices.map((invoice) => <div key={invoice.id} className="flex items-center justify-between border-b py-3"><div className="flex items-center gap-3"><Image src={invoice.image_url} className="rounded-full" alt={`${invoice.name}'s profile picture`} width={32} height={32} /><p className="truncate text-sm font-semibold">{invoice.name}</p></div><p className={`${lusitana.className} truncate text-sm font-medium`}>{invoice.amount}</p></div>)}</div><div className="mt-4 flex items-center text-sm text-gray-500"><ArrowPathIcon className="mr-1 h-5 w-5" />Updated just now</div></div>;
}