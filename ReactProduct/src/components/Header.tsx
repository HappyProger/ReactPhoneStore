// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-700">
        React PhoneStore
      </Link>

      <nav className="space-x-6 text-gray-700 font-medium">
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
              <Link to="/products" className="hover:text-blue-600">
                Catalog
              </Link>
              <Link to="/cart" className="hover:text-blue-600">
                Cart
              </Link>
      </nav>
    </header>
  );
};

export default Header;
