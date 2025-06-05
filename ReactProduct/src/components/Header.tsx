// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { useCart } from "../context/CartContext";

const Header: React.FC = () => {
  const {
    isCartOpen,
    toggleCart,
    cartItems,
    removeFromCart,
    onUpdateQuantity,
    onReorderItems,
  } = useCart();

  return (
    <>
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
          <button onClick={toggleCart} className="hover:text-blue-600 relative">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </nav>
      </header>

      <Cart
        isOpen={isCartOpen}
        onClose={toggleCart}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={onUpdateQuantity}
        onReorderItems={onReorderItems}
      />
    </>
  );
};

export default Header;
