import mongoose from 'mongoose';

// Define the schema for a subcategory
const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['bricks_and_tiles', 'bulk_material', 'cement'] },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps automatically
});

// Create the model if it doesn't already exist
const SubCategory = mongoose.models.subcategories || mongoose.model('subcategories', SubCategorySchema);

export default SubCategory;
