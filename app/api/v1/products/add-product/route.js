import Product from "@/models/product.model";
import { connectDB } from "@/dbConfig";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB(); // Connect to the database

  try {
    // Parse the JSON body of the request
    const {
      imagePath,
      productName,
      pricePerPiece,
      priceInFeet,
      priceInTonne,
      pricePerBag,
      description,
      subCategory,
      brand,
      category,
    } = await req.json();

    // Validate that the required fields exist
    if (!productName || !category) {
      return NextResponse.json({ success: false, message: "Product name and category are required" }, { status: 400 });
    }

    // Build the product object
    const newProduct = {
      imagePath,
      productName,
      description,
      subCategory,
      brand,
      category,
    };

    // Conditionally add price fields based on the category
    if (category === "bricks_and_tiles") {
      newProduct.pricePerPiece = pricePerPiece ?? null;
      newProduct.priceInFeet = null;
      newProduct.priceInTonne = null;
      newProduct.pricePerBag = null;
    } else if (category === "bulk_material") {
      newProduct.pricePerPiece = null;
      newProduct.priceInFeet = priceInFeet ?? null;
      newProduct.priceInTonne = priceInTonne ?? null;
      newProduct.pricePerBag = null;
    } else if (category === "cement") {
      newProduct.pricePerPiece = null;
      newProduct.priceInFeet = null;
      newProduct.priceInTonne = null;
      newProduct.pricePerBag = pricePerBag ?? null;
    } else {
      return NextResponse.json({ success: false, message: "Invalid category" }, { status: 400 });
    }

    console.log("newProduct", newProduct);

    // Create the new product in the database
    const createdProduct = await Product.create(newProduct);

    // Return the created product
    return NextResponse.json({ success: true, data: createdProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error.message);
    return NextResponse.json({ success: false, message: `Server error: ${error.message}` }, { status: 500 });
  }
}
