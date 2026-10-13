import InvoicesTable from '@/app/ui/invoices/table';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Invoices
      </h1>
      <InvoicesTable />
    </main>
  );
}