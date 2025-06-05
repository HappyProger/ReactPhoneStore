import React, { createContext, useContext, useState, ReactNode } from "react";

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
  oldPrice?: number;
  currency?: string;
  description: string;
  imageUrl: string;
  installment?: number;
  installmentCount?: number;
  specs: PhoneSpecs;
}

interface CartContextType {
  cartItems: Phone[];
  addToCart: (phone: Phone) => void;
  removeFromCart: (id: string) => void;
  isCartOpen: boolean;
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
    setCartItems((prev) => [...prev, phone]);
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
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
