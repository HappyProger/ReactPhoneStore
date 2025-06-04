import React, { useEffect, useState } from "react";
import PhoneCard from "./PhoneCard";
import FilterPanel from "./FilterPanel";
import SearchBar from "./SearchBar";

const BRAND_OPTIONS = ["Apple", "Oppo", "Samsung", "Vivo", "Xiaomi"];
const MEMORY_OPTIONS = [
  "32 GB",
  "64 GB",
  "128 GB",
  "256 GB",
  "512 GB",
  "1024 GB",
];

const PhoneCatalog: React.FC = () => {
  const [phones, setPhones] = useState<any[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedMemory, setSelectedMemory] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/phones");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Received data is not an array");
        }
        setPhones(data);
        setFilteredPhones(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setPhones([]);
        setFilteredPhones([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPhones();
  }, []);

  useEffect(() => {
    let filtered = phones;
    if (selectedBrand) {
      filtered = filtered.filter((phone) => phone.brand === selectedBrand);
    }
    if (selectedMemory) {
      const memNorm = selectedMemory.replace(/\s+/g, "").toLowerCase();
      filtered = filtered.filter(
        (phone) =>
          phone.specs &&
          phone.specs.storage &&
          phone.specs.storage.replace(/\s+/g, "").toLowerCase() === memNorm
      );
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (phone) =>
          phone.name.toLowerCase().includes(query) ||
          phone.brand.toLowerCase().includes(query)
      );
    }
    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }
    setFilteredPhones(filtered);
  }, [phones, selectedBrand, selectedMemory, searchQuery, sortOrder]);

  const hasActiveFilters = !!(selectedBrand || selectedMemory);

  const handleResetFilters = () => {
    setSelectedBrand("");
    setSelectedMemory("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading phones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">
          Error: {error}
          <br />
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-blue-800 drop-shadow-sm">
          Каталог телефонов
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-72 flex-shrink-0">
            <div className="mb-6">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                className="border border-blue-200 rounded-xl px-4 py-3 w-full text-lg font-semibold bg-white shadow focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              >
                <option value="asc">Сначала дешевые</option>
                <option value="desc">Сначала дорогие</option>
              </select>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <FilterPanel
                brands={BRAND_OPTIONS}
                selectedBrand={selectedBrand}
                memories={MEMORY_OPTIONS}
                selectedMemory={selectedMemory}
                onBrandChange={setSelectedBrand}
                onMemoryChange={setSelectedMemory}
                onReset={handleResetFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </div>
          <div className="flex-grow">
            <div className="mb-6">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
            {filteredPhones.length === 0 ? (
              <div className="text-center text-gray-600 text-xl bg-white rounded-xl shadow p-8">
                Нет телефонов по выбранным критериям
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPhones.map((phone) => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneCatalog;
