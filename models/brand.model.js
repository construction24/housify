import mongoose from 'mongoose';

// Define the schema for a brand
const BrandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['cement', 'bricks_and_tiles', 'bulk_material'] 
  },
}, {
  timestamps: true,
});

// Create the model if it doesn't already exist
const Brand = mongoose.models.brands || mongoose.model('brands', BrandSchema);

export default Brand;
