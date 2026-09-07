import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 p-6 text-white">
        <h2 className="mb-8 text-2xl font-bold">
          My Dashboard
        </h2>

        <nav className="space-y-3">
          <Link
            href="/dashboard"
            className="block rounded-md p-3 hover:bg-gray-800"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/customers"
            className="block rounded-md p-3 hover:bg-gray-800"
          >
            Customers
          </Link>

          <Link
            href="/dashboard/invoices"
            className="block rounded-md p-3 hover:bg-gray-800"
          >
            Invoices
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
}