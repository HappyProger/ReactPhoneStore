import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Phone } from "../types/types";
import PhoneCard from "../components/PhoneCard";
import FilterPanel from "../components/FilterPanel";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useCart } from "../context/CartContext";

const ITEMS_PER_PAGE = 4;

const PhoneCatalog: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const data = await api.getAllPhones();
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

    // Apply memory filter
    if (selectedMemory) {
      filtered = filtered.filter((phone) =>
        phone.specs?.storage?.includes(selectedMemory)
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (phone) => phone.price >= priceRange[0] && phone.price <= priceRange[1]
    );

    setFilteredPhones(filtered);
    setCurrentPage(1);
  }, [phones, searchQuery, selectedBrands, selectedMemory, priceRange]);

  const itemsPerPage = ITEMS_PER_PAGE;
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
            selectedMemory={selectedMemory}
            onMemoryChange={setSelectedMemory}
          />
        </div>
        <div className="md:w-3/4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            suggestions={phones}
          />
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
