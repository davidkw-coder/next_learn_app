export async function fetchCardData() {
  try {
    // We artificially delay a response for demo purposes.
    // Don't do this in production :)
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000)); 

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;
 
    console.log('Data fetch completed after 3 seconds.');


    // const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;
 
    // const data = await Promise.all([
    //   invoiceCountPromise,
    //   customerCountPromise,
    //   invoiceStatusPromise,
    // ]);
    
        // Fetch the last 5 invoices, sorted by date
    // const data = await sql<LatestInvoiceRaw[]>`
    // SELECT invoices.amount, customers.name, customers.image_url, customers.email
    // FROM invoices
    // JOIN customers ON invoices.customer_id = customers.id
    // ORDER BY invoices.date DESC
    // LIMIT 5`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

