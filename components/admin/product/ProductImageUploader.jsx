"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

export default function ProductImageUploader({ productData , imagePreview, setImagePreview, imageFile, setImageFile}) {
  

  // Effect to update the image preview when productData changes
  useEffect(() => {
    if (productData?.imagePath) {
      setImagePreview(productData.imagePath);
    }
  }, [productData]);

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Generate a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImageFile(file);
      setImagePreview(previewUrl);
    }
  };

  // Function to remove the selected image
  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Image</CardTitle>
        <CardDescription>Upload your product image here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {imagePreview && (
            <div className="relative flex justify-center mt-2">
              <img src={imagePreview} alt="Image preview" className="max-w-full h-auto" />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="h-4 w-4 text-red-500" />
                <span className="sr-only">Remove image</span>
              </button>
            </div>
          )}
          {!imagePreview && (
            <div className="h-20 w-20 m-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
              >
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
              </label>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
