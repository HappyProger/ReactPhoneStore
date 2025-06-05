import React from "react";
import { Phone } from "../types/types";

interface FilterPanelProps {
  phones: Phone[];
  selectedBrands: string[];
  onBrandChange: (brands: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  phones,
  selectedBrands,
  onBrandChange,
  priceRange,
  onPriceChange,
}) => {
  const uniqueBrands = Array.from(
    new Set(phones.map((phone) => phone.brand ?? ""))
  );
  const minPrice = Math.min(...phones.map((phone) => phone.price));
  const maxPrice = Math.max(...phones.map((phone) => phone.price));

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandChange(selectedBrands.filter((b) => b !== brand));
    } else {
      onBrandChange([...selectedBrands, brand]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-xl mb-3 border-b pb-2">Бренд</h3>
        {uniqueBrands.map((brand) => (
          <label key={brand} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-xl mb-3 border-b pb-2">Цена</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) =>
              onPriceChange([Number(e.target.value), priceRange[1]])
            }
            className="w-full"
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) =>
              onPriceChange([priceRange[0], Number(e.target.value)])
            }
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
