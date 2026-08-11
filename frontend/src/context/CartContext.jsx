import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sahtain_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('sahtain_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item._id === product._id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const priceToUse = product.discountPrice && product.discountPrice > 0 
          ? product.discountPrice 
          : product.price;
        return [...prev, {
          _id: product._id,
          name: product.name,
          price: priceToUse,
          originalPrice: product.price,
          volume: product.volume,
          packageQuantity: product.packageQuantity,
          image: product.images && product.images.length > 0 ? product.images[0] : '',
          quantity
        }];
      }
    });
    showToast(`تمت إضافة ${product.name} إلى السلة ✓`, 'success');
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
    showToast('تم حذف المنتج من السلة', 'info');
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item._id === productId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const vat = Number((subtotal * 0.15).toFixed(2));
  const deliveryFee = cart.length > 0 ? 10 : 0;
  const total = Number((subtotal + vat + deliveryFee).toFixed(2));

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItemCount,
      subtotal,
      vat,
      deliveryFee,
      total,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
