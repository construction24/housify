"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/Loader";

export default function ProductForm({ productData, formData, setFormData }) {
  // Set up local state to control the form fields
  

  // Populate form fields with productData when component mounts or productData changes
  useEffect(() => {
    if (productData) {
      setFormData({
        productName: productData.productName || "",
        description: productData.description || "",
      });
    }
  }, [productData]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Add and manage product details for your e-commerce store.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              type="text"
              className="w-full"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              className="min-h-32"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
