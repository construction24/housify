import { connectDB } from "@/dbConfig";
import Product from "@/models/product.model";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB();
  const url = new URL(req.url);
  const category = url.searchParams.get('category');

  try {
    const products = await Product.find({ category });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}