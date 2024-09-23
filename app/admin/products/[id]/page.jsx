"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ProductForm from "@/components/admin/product/ProductForm";
import ProductCategory from "@/components/admin/product/ProductCategory";
import ProductImageUploader from "@/components/admin/product/ProductImageUploader";
import ActionButtons from "@/components/admin/product/ActionButtons";
import { useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import Price from "@/components/admin/product/Price";

import { useRouter } from 'next/navigation';



export default function Page() {
  const router = useRouter();

    const id = usePathname().split('/').pop();

    const [productData, setProductData] = useState(null); // Use null for initial state
    const [formData, setFormData] = useState({
      productName: "",
      description: "",
    });

    const [category, setCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const [pricePerPiece, setPricePerPiece] = useState('');
    const [priceInFeet, setPriceInFeet] = useState('');
    const [priceInTonne, setPriceInTonne] = useState('');
    const [pricePerBag, setPricePerBag] = useState('');

    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');

    // Fetch product data when component mounts
    const handleFetchProduct = async () => {
        try {
          const response = await api.get(`/products/get-product`, {
            params: { id }
          });
          const data = response.data;
          setProductData(data); // Update the state with product data
        } catch (error) {
          console.error('Error:', error.message);
        }
    };

    useEffect(() => {
      handleFetchProduct();
    }, []);

    // Update price states when productData changes
    useEffect(() => {
      if (productData) {
        setFormData({
          productName: productData.productName,
          description: productData.description,
        });
        
        setCategory(productData.category);
        setPricePerPiece(productData.pricePerPiece || '');
        setPriceInFeet(productData.priceInFeet || '');
        setPriceInTonne(productData.priceInTonne || '');
        setPricePerBag(productData.pricePerBag || '');
        setSelectedBrand(productData?.brand || '');
        setSelectedSubcategory(productData?.subCategory || " ")
      }
    }, [productData]);

    // Save product in database
    async function saveProductInDatabase() {
      try {
        const response = await api.put(`/products/update-product?id=${id}`, {
          imagePath: imagePreview, 
          productName: formData.productName,
          pricePerPiece, 
          priceInFeet,
          priceInTonne,
          pricePerBag,
          description: formData.description,
          subCategory: selectedSubcategory,
          brand: selectedBrand,
          category: category,
        });
    
        const result = response.data; // Axios stores the response in the 'data' field
    
        if (result.success) {
          console.log("Product updated successfully:", result.data);
          router.replace(`/admin/products`); 
          
        } else {
          console.error("Failed to update product:", result.message);
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
    

    return (
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Link href = "/admin/products">
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Edit Your Product
            </h1>
            <ActionButtons saveProductInDatabase={saveProductInDatabase}/>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductForm productData={productData} formData={formData} setFormData={setFormData} />
              <ProductCategory productData={productData} category={category} setCategory={setCategory} subcategories={subcategories} setSubcategories={setSubcategories} brands={brands} setBrands={setBrands} selectedBrand = {selectedBrand} setSelectedBrand = {setSelectedBrand} selectedSubcategory = {selectedSubcategory} setSelectedSubcategory={setSelectedSubcategory}/>
              <Price 
                category={category} 
                pricePerBag={pricePerBag} setPricePerBag={setPricePerBag}
                pricePerPiece={pricePerPiece} setPricePerPiece={setPricePerPiece}
                pricePerTonne={priceInTonne} setPricePerTonne={setPriceInTonne}
                pricePerFeet={priceInFeet} setPricePerFeet={setPriceInFeet}
              />
            </div>
            <div>
              <ProductImageUploader productData={productData} imagePreview={imagePreview} setImagePreview={setImagePreview} imageFile={imageFile} setImageFile={setImageFile} />
            </div>
          </div>
        </div>
      </main>
    );
}
