import React from "react";

interface FilterPanelProps {
  brands: string[];
  selectedBrand: string;
  memories: string[];
  selectedMemory: string;
  onBrandChange: (brand: string) => void;
  onMemoryChange: (memory: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  brands,
  selectedBrand,
  memories,
  selectedMemory,
  onBrandChange,
  onMemoryChange,
  onReset,
  hasActiveFilters,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-xl mb-3 border-b pb-2">Бренд</h3>
        {brands.map((brand) => (
          <label key={brand} className="flex items-center mb-2">
            <input
              type="radio"
              name="brand"
              value={brand}
              checked={selectedBrand === brand}
              onChange={() => onBrandChange(brand)}
              className="mr-2"
            />
            {brand}
          </label>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-xl mb-3 border-b pb-2">Память</h3>
        {memories.map((memory) => (
          <label key={memory} className="flex items-center mb-2">
            <input
              type="radio"
              name="memory"
              value={memory}
              checked={selectedMemory === memory}
              onChange={() => onMemoryChange(memory)}
              className="mr-2"
            />
            {memory}
          </label>
        ))}
      </div>
      {hasActiveFilters && (
        <button
          className="mt-2 bg-red-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-red-600 transition"
          onClick={onReset}
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
