import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useCart } from "../context/CartContext";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header: React.FC = () => {
  const {
    isCartOpen,
    toggleCart,
    cartItems,
    removeFromCart,
    onUpdateQuantity,
    onReorderItems,
    clearCart,
  } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-white shadow-md py-4 px-12 sm:px-16 lg:px-32 flex justify-between items-center sticky top-0 z-50 w-full">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-blue-700 flex-shrink-0"
        >
          React PhoneStore
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="hidden lg:flex space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link
              to="/products"
              className="hover:text-blue-600 transition-colors"
            >
              Catalog
            </Link>
          </nav>

          <button
            onClick={toggleCart}
            className="hover:text-blue-600 transition-colors relative text-gray-700 font-medium"
            aria-label="Open cart"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          <button
            onClick={toggleMenu}
            className="lg:hidden p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <CloseIcon fontSize="small" />
            ) : (
              <MenuIcon fontSize="small" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-2 px-4 w-full">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="hover:text-blue-600 transition-colors py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Catalog
              </Link>
            </nav>
          </div>
        )}
      </header>

      <Cart
        isOpen={isCartOpen}
        onClose={toggleCart}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={onUpdateQuantity}
        onReorderItems={onReorderItems}
        clearCart={clearCart}
      />
    </>
  );
};

export default Header;
