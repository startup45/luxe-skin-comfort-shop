
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Load cart from localStorage if available
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  const saved = localStorage.getItem('luxeSkinCart');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
      return [];
    }
  }
  return [];
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('luxeSkinCart', JSON.stringify(items));
  }, [items]);

  // Add item to cart
  const addToCart = (product: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const quantity = product.quantity || 1;
    
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Update quantity of item in cart
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('luxeSkinCart');
  };

  // Calculate total number of items
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  // Calculate total price
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
