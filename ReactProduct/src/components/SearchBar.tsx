import React, { useEffect, useRef, useState } from "react";
import { Phone } from "../types/types";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: Phone[];
}

const DEBOUNCE_DELAY = 300;

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  suggestions,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filtered, setFiltered] = useState<Phone[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFiltered([]);
      return;
    }
    const lower = inputValue.toLowerCase();
    setFiltered(
      suggestions.filter(
        (phone) =>
          phone.name.toLowerCase().includes(lower) ||
          (phone.brand ?? "").toLowerCase().includes(lower) ||
          (phone.specs?.screen ?? "").toLowerCase().includes(lower) ||
          (phone.specs?.processor ?? "").toLowerCase().includes(lower) ||
          (phone.specs?.ram ?? "").toLowerCase().includes(lower) ||
          (phone.specs?.storage ?? "").toLowerCase().includes(lower) ||
          (phone.specs?.camera ?? "").toLowerCase().includes(lower)
      )
    );
  }, [inputValue, suggestions]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setShowSuggestions(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(val);
    }, DEBOUNCE_DELAY);
  };

  const handleSuggestionClick = (phone: Phone) => {
    setInputValue(phone.name);
    setShowSuggestions(false);
    onChange(phone.name);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 relative">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInput}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="Search phones by name, brand, or specs..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      {showSuggestions && filtered.length > 0 && (
        <ul className="absolute z-50 bg-white border border-gray-200 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filtered.slice(0, 8).map((phone) => (
            <li
              key={phone.id}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
              onMouseDown={() => handleSuggestionClick(phone)}
            >
              <span className="font-semibold">{phone.name}</span>
              {phone.brand && (
                <span className="text-gray-500 ml-2">{phone.brand}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
