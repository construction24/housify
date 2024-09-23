import { connectDB } from "@/dbConfig";
import SubCategory from "@/models/subCategory.model";
import { NextResponse } from 'next/server';

export async function GET(req) {
  await connectDB(); // Connect to the database
  const url = new URL(req.url);
  const category = url.searchParams.get('category'); // Get the category from the query params

  try {
    // Validate if the category is provided
    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    // Fetch subcategories based on the category
    const subcategories = await SubCategory.find({ type: category });

    // Return the fetched subcategories
    return NextResponse.json(subcategories, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch subcategories', error);
    return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
  }
}
