import { useRouter } from "next/navigation";

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

  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

  import Image from "next/image";

  import { Button } from "@/components/ui/button";

  import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";



const ProductTable = function({ products, category }) {
  const router = useRouter();

  const handleEdit = (id) => {
    // Navigate to the dynamic route /products/[id]
    router.push(`/admin/products/${id}`);
  };


  return (
    <Card className="w-[83vw] md:w-auto">
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
              <TableHead>Subcategory</TableHead>
              <TableHead>Brand</TableHead>
              {category === "bricks_and_tiles" && <TableHead>Price Per Piece</TableHead>}
              {category === "bulk_material" && (
                <>
                  <TableHead>Price Per Feet</TableHead>
                  <TableHead>Price Per Tonne</TableHead>
                </>
              )}
              {category === "cement" && <TableHead>Price Per Bag</TableHead>}
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={product.imagePath}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.productName}</TableCell>
                <TableCell>{product.subCategory}</TableCell>
                <TableCell>{product.brand}</TableCell>
                {category === "bricks_and_tiles" && (
                  <TableCell>{product.pricePerPiece}</TableCell>
                )}
                {category === "bulk_material" && (
                  <>
                    <TableCell>{product.priceInFeet}</TableCell>
                    <TableCell>{product.priceInTonne}</TableCell>
                  </>
                )}
                {category === "cement" && <TableCell>{product.pricePerBag}</TableCell>}
                <TableCell className="hidden md:table-cell">
                  {new Date(product.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(product._id)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

}

  export default ProductTable;
  