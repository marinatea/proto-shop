'use client';

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store/store';

const loadCartFromLocalStorage = () => {
  if (typeof window === 'undefined') return [];
  try {
    const serializedCart = localStorage.getItem('cartItems');
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.warn('Could not load cart:', e);
    return [];
  }
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<any>(null);

  useEffect(() => {
    const preloadedState = {
      cart: {
        items: loadCartFromLocalStorage(),
      },
    };

    const clientStore = makeStore(preloadedState);

    clientStore.subscribe(() => {
      const state = clientStore.getState();
      localStorage.setItem('cartItems', JSON.stringify(state.cart.items));
    });

    setStore(clientStore);
  }, []);

  if (!store) return null;

  return <Provider store={store}>{children}</Provider>;
}
