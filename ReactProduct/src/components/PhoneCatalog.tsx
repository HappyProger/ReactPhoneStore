import React, { useEffect, useState } from "react";
import PhoneCard from "./PhoneCard";
import FilterPanel from "./FilterPanel";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { useCart } from "../context/CartContext";

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

const ITEMS_PER_PAGE = 6;

const PhoneCatalog: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/phones");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPhones(data);
        setFilteredPhones(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  useEffect(() => {
    let filtered = [...phones];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (phone) =>
          phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (phone.brand ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((phone) =>
        selectedBrands.includes(phone.brand ?? "")
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (phone) => phone.price >= priceRange[0] && phone.price <= priceRange[1]
    );

    setFilteredPhones(filtered);
    setCurrentPage(1);
  }, [phones, searchQuery, selectedBrands, priceRange]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredPhones.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPhones = filteredPhones.slice(startIndex, endIndex);

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <FilterPanel
            phones={phones}
            selectedBrands={selectedBrands}
            onBrandChange={setSelectedBrands}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
          />
        </div>
        <div className="md:w-3/4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {currentPhones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} onAddToCart={addToCart} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneCatalog;
