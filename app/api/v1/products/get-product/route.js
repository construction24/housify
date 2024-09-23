import { connectDB } from '@/dbConfig'; // Import your DB connection logic
import Product from '@/models/product.model'; // Import your product model
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB(); // Connect to the database

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id'); // Get the 'id' from the query params

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Find the product by id
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
