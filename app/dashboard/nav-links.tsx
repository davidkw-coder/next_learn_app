import NavLinks from "@/app/ui/dashboard/nav-links";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 p-6">
        <h2 className="mb-8 text-2xl font-bold text-white">
          My Dashboard
        </h2>

        <NavLinks />
      </aside>

      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
}