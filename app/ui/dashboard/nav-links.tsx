'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { HomeIcon, UserGroupIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">{links.map(({ name, href, icon: Icon }) => <Link key={name} href={href} className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathname === href ? 'bg-sky-100 text-blue-600' : ''}`}><Icon className="w-6" /><p className="hidden md:block">{name}</p></Link>)}</div>;
}
