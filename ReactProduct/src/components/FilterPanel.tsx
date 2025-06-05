import React from "react";
import { Phone } from "../types/types";

const BRAND_OPTIONS = ["Apple", "Oppo", "Samsung", "Vivo", "Xiaomi"];
const MEMORY_OPTIONS = [
  "32 GB",
  "64 GB",
  "128 GB",
  "256 GB",
  "512 GB",
  "1024 GB",
];

interface FilterPanelProps {
  phones: Phone[];
  selectedBrands: string[];
  onBrandChange: (brands: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedMemory?: string;
  onMemoryChange?: (memory: string) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (order: "asc" | "desc") => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  phones,
  selectedBrands,
  onBrandChange,
  priceRange,
  onPriceChange,
  selectedMemory,
  onMemoryChange,
  sortOrder,
  onSortOrderChange,
}) => {
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
      {/* Сортировка */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-xl mb-3 border-b pb-2">Сортировка</h3>
        <select
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value as "asc" | "desc")}
          className="w-full p-2 border rounded"
        >
          <option value="asc">Сначала дешевые</option>
          <option value="desc">Сначала дорогие</option>
        </select>
      </div>
      {/* Фильтр по брендам */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-xl mb-3 border-b pb-2">Бренд</h3>
        {BRAND_OPTIONS.map((brand) => (
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

      {/* Фильтр по памяти */}
      {onMemoryChange && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold text-xl mb-3 border-b pb-2">Объем памяти</h3>
          <select
            value={selectedMemory || ""}
            onChange={(e) => onMemoryChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Все варианты</option>
            {MEMORY_OPTIONS.map((memory) => (
              <option key={memory} value={memory}>
                {memory}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Фильтр по цене */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-xl mb-3 border-b pb-2">Цена</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
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
