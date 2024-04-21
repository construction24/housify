"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function BrandsFilterAndDisplay() {
  // Define lists of categories and brands
  const categories = [
    "PPC",
    "OPC",
    "PSC",
    "Composite",
    "White Cement",
    "Premium",
    "Putty",
    "Ready Mix Plaster",
  ];

  const brands = [
    "ACC",
    "Anjan",
    "Arasu",
    "Asian",
    "Best Cost",
    "Best Quality",
    "Bhavya",
    "Birla Al",
  ];

  // State variables for selected categories, selected brands, and filter menu visibility
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  console.log(selectedCategories)

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
    <div className="flex flex-col mt-4">
      {/* Display selected filters */}
      {(selectedCategories.length > 0 || selectedBrands.length > 0) && (
        <div className="mb-8 pl-4">
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
      <div className="flex">
        {/* Sidebar filter */}
        <div className="filter-container pr-14 hidden md:block">
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
        <div className=" border w-full">
          {/* Add your product cards or components here */}
          Product cards...
        </div>
      </div>
    </div>
  );
}

export default BrandsFilterAndDisplay;
