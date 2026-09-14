import { Revenue } from './definitions';

export function formatCurrency(amount: number) {
  return (amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function generateYAxis(revenue: Revenue[]) {
  const highestRecord = Math.max(...revenue.map((month) => month.revenue), 0);
  const topLabel = Math.ceil(highestRecord / 1000) * 1000 || 1000;
  const yAxisLabels = Array.from({ length: 5 }, (_, index) => topLabel - (index * topLabel) / 4);
  return { yAxisLabels, topLabel };
}

export function generatePagination(currentPage: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);
  if (currentPage <= 3) return [1, 2, 3, '...', totalPages - 1, totalPages];
  if (currentPage >= totalPages - 2) return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}
