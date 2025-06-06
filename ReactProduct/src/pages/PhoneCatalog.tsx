import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Phone } from "../types/types";
import PhoneCard from "../components/PhoneCard";
import FilterPanel from "../components/FilterPanel";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { useCart } from "../context/CartContext";
import FilterListIcon from "@mui/icons-material/FilterList";
// import FilterListOffIcon from "@mui/icons-material/FilterListOff";

const ITEMS_PER_PAGE = 8;

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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { addToCart } = useCart();

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };

  const closeFilterPanel = () => {
    setIsFilterPanelOpen(false);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setSelectedMemory("");
    const minPrice =
      phones.length > 0 ? Math.min(...phones.map((phone) => phone.price)) : 0;
    const maxPrice =
      phones.length > 0
        ? Math.max(...phones.map((phone) => phone.price))
        : 1500; 
    setPriceRange([minPrice, maxPrice]);
    setSortOrder("asc");
    setCurrentPage(1); 
  };

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

    if (searchQuery) {
      filtered = filtered.filter(
        (phone) =>
          phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (phone.brand ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((phone) =>
        selectedBrands.includes(phone.brand ?? "")
      );
    }

    if (selectedMemory) {
      filtered = filtered.filter((phone) => {
        const storage = phone.specs?.storage?.replace(/\s+/g, "").toLowerCase();
        const selected = selectedMemory.replace(/\s+/g, "").toLowerCase();
        return storage === selected;
      });
    }

    filtered = filtered.filter(
      (phone) => phone.price >= priceRange[0] && phone.price <= priceRange[1]
    );

    filtered = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredPhones(filtered);
    setCurrentPage(1);
  }, [
    phones,
    searchQuery,
    selectedBrands,
    selectedMemory,
    priceRange,
    sortOrder,
  ]);

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
 
      <div className="flex justify-end lg:hidden mb-4 z-50">
        <button
          onClick={toggleFilterPanel}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          aria-label="Toggle filters"
        >
          <FilterListIcon /> 
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div
          className={`w-full lg:w-1/4 lg:relative absolute top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${
            isFilterPanelOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block ${
            !isFilterPanelOpen && window.innerWidth < 1024 ? "hidden" : ""
          }`}
        >
          {(isFilterPanelOpen || window.innerWidth >= 1024) && (
            <FilterPanel
              phones={phones}
              selectedBrands={selectedBrands}
              onBrandChange={setSelectedBrands}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedMemory={selectedMemory}
              onMemoryChange={setSelectedMemory}
              sortOrder={sortOrder}
              onSortOrderChange={setSortOrder}
              onResetFilters={handleResetFilters}
              isMobileOpen={isFilterPanelOpen} 
              onClose={closeFilterPanel} 
            />
          )}
        </div>

        <div className={`w-full ${isFilterPanelOpen ? "lg:w-3/4" : ""}`}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            suggestions={phones}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {currentPhones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} onAddToCart={addToCart} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center w-full mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneCatalog;
