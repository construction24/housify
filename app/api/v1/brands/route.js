import { connectDB } from "@/dbConfig";
import Brand from "@/models/brand.model"; // Assuming you have a Brand model
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB(); // Connect to the database
  const url = new URL(req.url);
  const category = url.searchParams.get('category'); // Get the category from the query params

  try {
    const brands = await Brand.find({ category }); // Fetch brands by category
    return NextResponse.json(brands, { status: 200 }); // Return the brands in the response
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch brands' }, { status: 500 }); // Handle any errors
  }
}
