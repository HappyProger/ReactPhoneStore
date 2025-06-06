import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { Phone } from "../types/types";

interface CartContextType {
  addToCart: (phone: Phone) => void;
  removeFromCart: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onReorderItems: (items: Phone[]) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  cartItems: Phone[];
  toggleCart: () => void;
  totalPrice: number;
}

const CART_STORAGE_KEY = "cart_data";
const CART_VERSION = "1.0";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Phone[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const { version, items } = JSON.parse(savedCart);
        if (version === CART_VERSION) {
          return items;
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Синхронизация с localStorage при изменении cartItems
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
          version: CART_VERSION,
          items: cartItems,
        })
      );
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

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

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing cart from localStorage:", error);
    }
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
        clearCart,
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
