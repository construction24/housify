"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from '@/lib/axiosInstance';

export default function ProductCategory({ productData, category, setCategory, subcategories, setSubcategories, brands, setBrands, selectedBrand, setSelectedBrand, selectedSubcategory, setSelectedSubcategory }) {
  
  const [loading, setLoading] = useState(false);
  

  // Update local state when productData changes
  useEffect(() => {
    if (productData) {
      setCategory(productData.category || '');
      setSelectedSubcategory(productData.subCategory || '');
      setSelectedBrand(productData.brand || '');
      
      // Fetch the updated subcategories and brands for the new category
      if (productData.category) {
        fetchBrandAndSubcategories(productData.category);
      }
    }
  }, [productData]);

  // Function to handle category change
  const handleCategoryChange = (value) => {
    setCategory(value);
    setSelectedSubcategory(null); // Reset selected subcategory
    setSelectedBrand(null); // Reset selected brand
    fetchBrandAndSubcategories(value);
  };

  // Function to fetch brands and subcategories from API
  const fetchBrandAndSubcategories = async (selectedCategory) => {
    setLoading(true);
    try {
      const [brandRes, subcategoryRes] = await Promise.all([
        api.get(`/brands?category=${selectedCategory}`),
        api.get(`/subcategories?category=${selectedCategory}`),
      ]);

      setBrands(brandRes?.data);
      setSubcategories(subcategoryRes?.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Category Dropdown */}
          <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleCategoryChange} value={category || ''}>
              <SelectTrigger id="category" aria-label="Select category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cement">Cement</SelectItem>
                <SelectItem value="bricks_and_tiles">Bricks and Tiles</SelectItem>
                <SelectItem value="bulk_material">Bulk Material</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subcategory Dropdown */}
          <div className="grid gap-3">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select
              value={selectedSubcategory || ''}
              onValueChange={setSelectedSubcategory}
              disabled={!category || loading}
            >
              <SelectTrigger id="subcategory" aria-label="Select subcategory">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {subcategories?.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.name}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Brand Dropdown */}
          <div className="grid gap-3">
            <Label htmlFor="brand">Brand</Label>
            <Select
              value={selectedBrand || ''}
              onValueChange={setSelectedBrand}
              disabled={!category || loading}
            >
              <SelectTrigger id="brand" aria-label="Select brand">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brands?.map((brand) => (
                  <SelectItem key={brand.id} value={brand.name}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
