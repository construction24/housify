import { NextResponse } from 'next/server';
import { connectDB } from '@/dbConfig';
import Product from '@/models/product.model';
import Brand from '@/models/brand.model';
import SubCategory from '@/models/subCategory.model';

export async function GET(_, { params }) {
  const { category } = params;

  await connectDB();

  try {
    console.log(`Fetching data for category: ${category}`);

    const [brands, subCategories, products] = await Promise.all([
      Brand.find({ category }).exec(),
      SubCategory.find({ type: category }).exec(),
      Product.find({ category }).populate('brand').populate('subCategory').exec(),
    ]);

    console.log(`Fetched ${brands.length} brands, ${subCategories.length} subcategories, and ${products.length} products for category: ${category}`);

    const response = {
      brandImages: brands.map((brand) => brand.imagePath),
      categories: subCategories.map((sub) => sub.name),
      brands: brands.map((brand) => brand.name),
      products: products,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(`Error fetching data for category: ${category}`, error);
    return NextResponse.json({ error: 'Failed to fetch data for the specified category' }, { status: 500 });
  }
}
