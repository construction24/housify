"use client";

import { useState, useEffect } from "react";

import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import ProductTable from "@/components/admin/product/ProductTable";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { Button } from "@/components/ui/button";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("cement");
  const [products, setProducts] = useState([]);


  const handleDownloadData = () => {
    const productsWithoutId = products.map(({ _id, ...rest }) => rest);
    const dataStr = JSON.stringify(productsWithoutId, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedTab}-products.json`;
    link.click();
    URL.revokeObjectURL(url);
  };


  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/v1/products?category=${selectedTab}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };




  useEffect(() => {    
    fetchProducts();
  }, [selectedTab]);

  return (
    <div className="p-4">
      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="cement">Cement</TabsTrigger>
            <TabsTrigger value="bricks_and_tiles">Bricks and Tiles</TabsTrigger>
            <TabsTrigger value="bulk_material">Bulk Material</TabsTrigger>
          </TabsList>
          <div 
          className="ml-auto flex items-center gap-2">
            <Button 
            onClick={()=> handleDownloadData()}
            disabled = {products.length === 0}
            size="sm" variant="outline" className="h-7 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Link href="/admin/products/add-products">
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value={selectedTab}>
          <ProductTable products={products} category={selectedTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

