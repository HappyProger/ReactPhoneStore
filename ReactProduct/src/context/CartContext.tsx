import React, { createContext, useContext, useState, ReactNode } from "react";

import { Phone } from "../types/types";

interface CartContextType {
  addToCart: (phone: Phone) => void;
  removeFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onReorderItems: (items: Phone[]) => void;
  isCartOpen: boolean;
  cartItems: Phone[];
  toggleCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Phone[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (phone: Phone) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === phone.id);
      if (existing) {
        return prev.map((item) =>
          item.id === phone.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prev, { ...phone, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const onReorderItems = (items: Phone[]) => {
    setCartItems(items);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        onUpdateQuantity,
        onReorderItems,
        isCartOpen,
        toggleCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
