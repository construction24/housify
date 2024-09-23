"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function Price({ category, setCategory, pricePerBag, setPricePerBag, pricePerPiece, setPricePerPiece, pricePerFeet, setPricePerFeet, pricePerTonne, setPricePerTonne }) {

    console.log(category, pricePerBag, pricePerFeet, pricePerFeet, pricePerTonne, pricePerBag)
  const renderPriceField = () => {
    switch (category) {
      case 'cement':
        return (
          <div className="grid gap-3">
            <Label htmlFor="pricePerBag">Price Per Bag</Label>
            <Input
              type="number"
              id="pricePerBag"
              value={pricePerBag || ''}
              className="input"
              placeholder="Enter price per bag"
              onChange={(e) => setPricePerBag(Number(e.target.value))}
            />
          </div>
        );
      case 'bricks_and_tiles':
        return (
          <div className="grid gap-3">
            <Label htmlFor="pricePerPiece">Price Per Piece</Label>
            <Input
              type="number"
              id="pricePerPiece"
              value={pricePerPiece || ''}
              className="input"
              placeholder="Enter price per piece"
              onChange={(e) => setPricePerPiece(Number(e.target.value))}
            />
          </div>
        );
      default:
        return (
          <>
            <div className="grid gap-3">
              <Label htmlFor="pricePerFeet">Price Per Feet</Label>
              <Input
                type="number"
                id="pricePerFeet"
                value={pricePerFeet || ''}
                className="input"
                placeholder="Enter price per feet"
                onChange={(e) => setPricePerFeet(Number(e.target.value))}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="pricePerTonne">Price Per Tonne</Label>
              <Input
                type="number"
                id="pricePerTonne"
                value={pricePerTonne || ''}
                className="input"
                placeholder="Enter price per tonne"
                onChange={(e) => setPricePerTonne(Number(e.target.value))}
              />
            </div>
          </>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Price</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Category Dropdown */}
          <div className="grid gap-3">
            <Label htmlFor="category">Category</Label>
            <Select value={category || ''} onValueChange={setCategory}>
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

          {/* Price Fields based on selected category */}
          {renderPriceField()}
        </div>
      </CardContent>
    </Card>
  );
}
