import mongoose from 'mongoose';
import Product from '../models/product.model.js'; // Adjust the path as necessary
import Brand from '../models/brand.model.js'; // Adjust the path as necessary
import SubCategory from '../models/subCategory.model.js'; // Adjust the path as necessary
import { DB_NAME } from '@/constants/index.js';

// MongoDB URI
const MONGODB_URI = `${process.env.MONGODB_URI}/${DB_NAME}`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const bricksAndTilesData = {
  subCategories: [
    "AAC Block",
    "Hollow Blocks",
    "Interlocking Blocks",
    "Porotherm Blocks",
    "Cover Blocks",
    "Kerb Stone",
    "Paver Blocks",
    "Chamber Bricks",
    "Solid Blocks",
    "Wirecut Bricks",
    "Flyash Bricks",
    "Box Bricks",
    "BJM",
    "Broken AAC Block",
  ],
  brands: [
    "Aerocon",
    "Best Cost",
    "Best Quality",
    "Cellokon",
    "Fusion",
    "Homesure",
    "Kamcrete",
    "Magna",
    "Meghalite",
    "Mepcrete",
    "NCL",
    "PRIME",
    "Ramco",
    "Renacon",
    "Ultratech",
    "Weber",
  ],
};

const bulkMaterialData = {
  subCategories: [
    "Aggregate (Cft)",
    "M-Sand (Cft)",
    "Filling Earth (Cft)",
    "Hill Earth",
    "Flyash",
    "Aggregate (MT)",
    "River Sand (MT)",
    "Aggregate Soiling Stone (MT)",
    "P-Sand (Cft)",
    "M-Sand (MT)",
    "River Sand (Cft)",
    "P-Sand (MT)",
    "GSB",
    "wetmix"
  ],
  brands: [
    "Best Cost",
    "Best Quality",
  ],
};

const cementData = {
  subCategories: [
    "PPC",
    "OPC"
  ],
  brands: [
    "ACC",
    "Ambuja",
    "UltraTech",
    "Asian",
    "Best Cost",
    "Best Quality",
    "Bhavya",
    "Birla A1",
  ],
};

const generateSampleProducts = (brands, subCategories, category) => {
  const sampleProducts = [];
  for (const brand of brands) {
    for (const subCategory of subCategories) {
      sampleProducts.push({
        imagePath: "https://images.l1supply.com/products/Cement/PPC/PC2C01AAZ1000.webp",
        productName: `Sample Product ${Math.random().toString(36).substring(7)}`,
        pricePerPiece: category === "bricks_and_tiles" ? Math.floor(Math.random() * 100) + 1 : undefined,
        priceInFeet: category === "bulk_material" ? Math.floor(Math.random() * 100) + 1 : undefined,
        priceInTonne: category === "bulk_material" ? Math.floor(Math.random() * 1000) + 100 : undefined,
        pricePerBag: category === "cement" ? Math.floor(Math.random() * 500) + 50 : undefined,
        description: "Sample description",
        subCategory,
        brand,
        category,
      });
      if (sampleProducts.length >= 30) break;
    }
    if (sampleProducts.length >= 30) break;
  }
  return sampleProducts;
};

const insertData = async (data, category) => {
  const { subCategories, brands } = data;

  // Add Brands
  for (const brandName of brands) {
    const brandExists = await Brand.findOne({ name: brandName, category });
    if (!brandExists) {
      await Brand.create({
        name: brandName,
        imagePath: "https://images.l1supply.com/brands/Best%20Quality.webp",
        category,
      });
    }
  }

  // Add Subcategories
  for (const subCategoryName of subCategories) {
    const subCategoryExists = await SubCategory.findOne({ name: subCategoryName, type: category });
    if (!subCategoryExists) {
      await SubCategory.create({
        name: subCategoryName,
        type: category,
      });
    }
  }

  // Generate Sample Products
  const sampleProducts = generateSampleProducts(brands, subCategories, category);

  // Add Products
  for (const product of sampleProducts) {
    const brand = await Brand.findOne({ name: product.brand, category });
    if (brand) {
      const subCategory = await SubCategory.findOne({ name: product.subCategory, type: category });
      if (subCategory) {
        await Product.create({
          imagePath: product.imagePath,
          productName: product.productName,
          pricePerPiece: product.pricePerPiece,
          priceInFeet: product.priceInFeet,
          priceInTonne: product.priceInTonne,
          pricePerBag: product.pricePerBag,
          description: product.description,
          subCategory: subCategory._id,
          brand: brand._id,
          category: product.category,
        });
      }
    }
  }
};

const run = async () => {
  await connectDB();

  await insertData(bricksAndTilesData, 'bricks_and_tiles');
  await insertData(bulkMaterialData, 'bulk_material');
  await insertData(cementData, 'cement');

  console.log('Data inserted successfully');
  process.exit();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
