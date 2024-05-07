"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CementProductCard from "../../components/product-cards/CementProductCard";
import BulkMaterialProductCard from "@/components/product-cards/BulkMaterialProductCard";
import BricksAndBlocksProductCard from "@/components/product-cards/BricksAndBlocksProductCard";

function BrandsFilterAndDisplay({
  category,
  categories = [

  ],
  brands = [
    "Best Cost",
    "Best Quality",
  ],
}) {
  // State variables for selected categories, selected brands, and filter menu visibility
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Handle category change
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prevCategories) =>
      checked
        ? [...prevCategories, value]
        : prevCategories.filter((category) => category !== value)
    );
  };

  // Handle brand change
  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    setSelectedBrands((prevBrands) =>
      checked
        ? [...prevBrands, value]
        : prevBrands.filter((brand) => brand !== value)
    );
  };

  // Toggle filter menu visibility
  const toggleFilterMenu = () => {
    setIsFilterOpen((prevIsFilterOpen) => !prevIsFilterOpen);
  };

  return (
    <div className="flex flex-col">
      {/* Display selected filters */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
        <div className="mb-8 pl-4 mt-10">
          <div>Showing results for:</div>
          {selectedCategories.length > 0 && (
            <div>
              <span className="font-bold">Sub-Categories:</span>{" "}
              {selectedCategories.join(", ")}
            </div>
          )}
          {selectedBrands.length > 0 && (
            <div>
              <span className="font-bold">Brands:</span>{" "}
              {selectedBrands.join(", ")}
            </div>
          )}
        </div>
      )}

      {/* Filter menu toggle button for mobile */}
      <Button className="mb-4 md:hidden" onClick={toggleFilterMenu}>
        Filter Options
      </Button>

      {/* Mobile filter menu */}
      {isFilterOpen && (
        <div className="p-4 border mb-4 rounded md:hidden">
          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="font-bold mb-2">Sub-Categories</h3>
            {categories.map((category) => (
              <div key={category} className="mt-1.5">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
                <label className="ml-2" htmlFor={`category-${category}`}>
                  {category}
                </label>
              </div>
            ))}
          </div>

          {/* Brand Filter */}
          <div>
            <h3 className="font-bold mb-2">Brands</h3>
            {brands.map((brand) => (
              <div key={brand} className="mt-1.5">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={handleBrandChange}
                />
                <label className="ml-2" htmlFor={`brand-${brand}`}>
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop filter section */}
      <div className="flex gap-10">
        {/* Sidebar filter */}
        <div className="filter-container hidden md:block basis-1/4">
          <h2 className="font-bold mb-3">Filter By</h2>

          {/* Sub-Categories */}
          <div className="mb-4">
            <h3 className="font-bold mb-4">Sub-Categories</h3>
            {categories.map((category) => (
              <div key={category} className="mt-1.5">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                />
                <label className="ml-2" htmlFor={`category-${category}`}>
                  {category}
                </label>
              </div>
            ))}
          </div>

          {/* Brands */}
          <div className="mb-4">
            <h3 className="font-bold mb-4">Brands</h3>
            {brands.map((brand) => (
              <div key={brand} className="mt-1.5">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  value={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={handleBrandChange}
                />
                <label className="ml-2" htmlFor={`brand-${brand}`}>
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Products Display Area */}
        <div className="py-10 w-full flex justify-center sm:justify-start items-start flex-wrap gap-16">
          {/* Add your product cards or components here */}

          {category === "cement" && <CementProductCard />}
          {category === "cement" && <CementProductCard />}
          {category === "cement" && <CementProductCard />}
          {category === "cement" && <CementProductCard />}
          {category === "cement" && <CementProductCard />}
          {category === "cement" && <CementProductCard />}
          {category === "cement" && <CementProductCard />}
          {category === "bricks_and_blocks" && <BricksAndBlocksProductCard />}
          {category === "bricks-and-blocks" && <BricksAndBlocksProductCard />}
          {category === "bricks-and-blocks" && <BricksAndBlocksProductCard />}
          {category === "bricks-and-blocks" && <BricksAndBlocksProductCard />}
          {category === "bricks-and-blocks" && <BricksAndBlocksProductCard />}
          {category === "bulk-material" && <BulkMaterialProductCard />}
          {category === "bulk-material" && <BulkMaterialProductCard />}
          {category === "bulk-material" && <BulkMaterialProductCard />}
          {category === "bulk-material" && <BulkMaterialProductCard />}
        </div>
      </div>
    </div>
  );
}

export default BrandsFilterAndDisplay;
