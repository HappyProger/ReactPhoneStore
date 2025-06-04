import React from "react";

interface FilterPanelProps {
  brands: string[];
  selectedBrand: string;
  priceRange: { min: number; max: number };
  onBrandChange: (brand: string) => void;
  onPriceChange: (min: number, max: number) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  brands,
  selectedBrand,
  priceRange,
  onBrandChange,
  onPriceChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="font-medium mb-2">Brand</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="brand"
              value=""
              checked={selectedBrand === ""}
              onChange={(e) => onBrandChange(e.target.value)}
              className="mr-2"
            />
            All Brands
          </label>
          {brands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="radio"
                name="brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={(e) => onBrandChange(e.target.value)}
                className="mr-2"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Min Price</label>
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) =>
                onPriceChange(Number(e.target.value), priceRange.max)
              }
              className="w-full p-2 border rounded mt-1"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Max Price</label>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) =>
                onPriceChange(priceRange.min, Number(e.target.value))
              }
              className="w-full p-2 border rounded mt-1"
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
