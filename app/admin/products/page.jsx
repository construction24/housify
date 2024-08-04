"use client";

import Image from "next/image";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample product data
const products = [
  {
    id: 1,
    name: "Laser Lemonade Machine",
    status: "Draft",
    price: "$499.99",
    sales: 25,
    createdAt: "2023-07-12 10:42 AM",
    imageSrc: "https://ui.shadcn.com/placeholder.svg",
  },
  {
    id: 2,
    name: "Hypernova Headphones",
    status: "Active",
    price: "$129.99",
    sales: 100,
    createdAt: "2023-10-18 03:21 PM",
    imageSrc: "https://ui.shadcn.com/placeholder.svg",
  },
  {
    id: 3,
    name: "AeroGlow Desk Lamp",
    status: "Active",
    price: "$39.99",
    sales: 50,
    createdAt: "2023-11-29 08:15 AM",
    imageSrc: "https://ui.shadcn.com/placeholder.svg",
  },
  {
    id: 4,
    name: "TechTonic Energy Drink",
    status: "Draft",
    price: "$2.99",
    sales: 0,
    createdAt: "2023-12-25 11:59 PM",
    imageSrc: "https://ui.shadcn.com/placeholder.svg",
  },
  {
    id: 5,
    name: "Gamer Gear Pro Controller",
    status: "Active",
    price: "$59.99",
    sales: 75,
    createdAt: "2024-01-01 12:00 AM",
    imageSrc: "https://ui.shadcn.com/placeholder.svg",
  },
  {
    id: 6,
    name: "Luminous VR Headset",
    status: "Active",
    price: "$199.99",
    sales: 30,
    createdAt: "2024-02-14 02:14 PM",
    imageSrc: "https://ui.shadcn.com/placeholder.svg",
  },
];

export default function Page() {
  return (
    <div className="p-4">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-7 gap-1">
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
        <TabsContent value="all">
          <Card className = "w-[83vw] md:w-auto">
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Sales
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={product.imageSrc}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.status}</Badge>
                      </TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.sales}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.createdAt}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
