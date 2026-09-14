import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';
import { generateYAxis } from '@/app/lib/utils';

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  const { yAxisLabels, topLabel } = generateYAxis(revenue);
  return <div className="w-full rounded-xl bg-gray-50 p-4 md:col-span-4"><h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Recent Revenue</h2><div className="grid grid-cols-[40px_1fr] items-end gap-2"><div className="flex h-[350px] flex-col justify-between text-xs text-gray-500">{yAxisLabels.map((label) => <p key={label}>{label}</p>)}</div><div className="flex h-[350px] items-end justify-around gap-2 rounded-md bg-white p-4">{revenue.map((month) => <div key={month.month} className="flex h-full flex-1 flex-col justify-end"><div className="bg-blue-500" style={{ height: `${(month.revenue / topLabel) * 100}%` }} /><span className="mt-2 text-center text-xs">{month.month}</span></div>)}</div></div><div className="mt-4 flex items-center gap-2 text-sm text-gray-500"><CalendarIcon className="h-5 w-5" />Last 12 months</div></div>;
}
 