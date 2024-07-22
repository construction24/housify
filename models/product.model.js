import mongoose from "mongoose";

// Define the schema for a product
const ProductSchema = new mongoose.Schema(
  {
    imagePath: { type: String, required: true },
    productName: { type: String, required: true },
    pricePerPiece: {
      type: Number,
      // Use this field only for "bricks_and_blocks" 
      required: function () {
        return (
          this.category === "bricks_and_blocks"
        );
      },
    },
    priceInFeet: {
      type: Number,
      // Use this field only for "bulk_material"
      required: function () {
        return this.category === "bulk_material";
      },
    },
    priceInTonne: {
      type: Number,
      // Use this field only for "bulk_material"
      required: function () {
        return this.category === "bulk_material";
      },
    },
    pricePerBag: {
      type: Number,
      // Use this field only for "cement"
      required: function () {
        return this.category === "cement";
      },
    },
    description: { type: String, default: "" },
    subCategory: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["cement", "bricks_and_blocks", "bulk_material"],
    },
  },
  {
    timestamps: true,
  }
);

// Create the model if it doesn't already exist
const Product =
  mongoose.models.products || mongoose.model("products", ProductSchema);

export default Product;
