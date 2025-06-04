import React, { useEffect, useState } from "react";
import PhoneCard from "./PhoneCard";
import FilterPanel from "./FilterPanel";
import SearchBar from "./SearchBar";

interface PhoneSpecs {
  screen: string;
  processor: string;
  ram: string;
  storage: string;
  camera: string;
}

interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  specs: PhoneSpecs;
}

const PhoneCatalog: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        console.log("Fetching phones...");
        const response = await fetch("http://localhost:5000/api/phones");
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received data:", data);

        if (!Array.isArray(data)) {
          throw new Error("Received data is not an array");
        }

        setPhones(data);
        setFilteredPhones(data);
      } catch (err) {
        console.error("Error fetching phones:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  useEffect(() => {
    let filtered = phones;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (phone) =>
          phone.name.toLowerCase().includes(query) ||
          phone.brand.toLowerCase().includes(query) ||
          phone.description.toLowerCase().includes(query) ||
          Object.values(phone.specs).some((spec) =>
            spec.toLowerCase().includes(query)
          )
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter((phone) => phone.brand === selectedBrand);
    }

    filtered = filtered.filter(
      (phone) => phone.price >= priceRange.min && phone.price <= priceRange.max
    );

    setFilteredPhones(filtered);
  }, [phones, searchQuery, selectedBrand, priceRange]);

  const uniqueBrands = Array.from(new Set(phones.map((phone) => phone.brand)));

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
      <h1 className="text-3xl font-bold text-center mb-8">Phone Catalog</h1>

      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex gap-8">
        <div className="w-64 flex-shrink-0">
          <FilterPanel
            brands={uniqueBrands}
            selectedBrand={selectedBrand}
            priceRange={priceRange}
            onBrandChange={setSelectedBrand}
            onPriceChange={(min, max) => setPriceRange({ min, max })}
          />
        </div>

        <div className="flex-grow">
          {filteredPhones.length === 0 ? (
            <div className="text-center text-gray-600 text-xl">
              No phones found matching your criteria
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneCatalog;
