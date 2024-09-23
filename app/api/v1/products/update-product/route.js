import Product from "@/models/product.model";
import { connectDB } from "@/dbConfig";
import { NextResponse } from "next/server"; // Import NextResponse for responses

export async function PUT(req) {
  await connectDB(); // Connect to the database

  try {
    const url = new URL(req.url); // Get the full URL
    const id = url.searchParams.get("id"); // Extract 'id' from the query parameters
    
    // Ensure the ID is valid
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing product ID" }, { status: 400 });
    }

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
    } = await req.json(); // Extract product fields from the request body

    // Validate that the required fields exist
    if (!productName || !category) {
      return NextResponse.json({ success: false, message: "Product name and category are required" }, { status: 400 });
    }

    // Build the update object based on the category
    const updateFields = {
      imagePath,
      productName,
      description,
      subCategory,
      brand,
      category,
    };

    // Conditionally add price fields based on the category
    if (category === "bricks_and_tiles") {
      updateFields.pricePerPiece = pricePerPiece ?? null;
      updateFields.priceInFeet = undefined;
      updateFields.priceInTonne = undefined;
      updateFields.pricePerBag = undefined;
    } else if (category === "bulk_material") {
      updateFields.pricePerPiece = undefined;
      updateFields.priceInFeet = priceInFeet ?? null;
      updateFields.priceInTonne = priceInTonne ?? null;
      updateFields.pricePerBag = undefined;
    } else if (category === "cement") {
      updateFields.pricePerPiece = undefined;
      updateFields.priceInFeet = undefined;
      updateFields.priceInTonne = undefined;
      updateFields.pricePerBag = pricePerBag ?? null;
    } else {
      return NextResponse.json({ success: false, message: "Invalid category" }, { status: 400 });
    }

    console.log("updatedFields", updateFields);

    // Find and update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    // Check if product was found
    if (!updatedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // Return the updated product
    return NextResponse.json({ success: true, data: updatedProduct }, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error.message);
    return NextResponse.json({ success: false, message: `Server error: ${error.message}` }, { status: 500 });
  }
}
