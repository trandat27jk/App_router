// app/query/route.ts
import postgres from 'postgres';
import { NextResponse } from 'next/server';

// Initialize Postgres client
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Query function to list invoices
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  return data;
}

// GET route handler
export async function GET() {
  try {
    const result = await listInvoices();
    return NextResponse.json(result); // Return query result
  } catch (error) {
    console.error('Query failed:', error);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
