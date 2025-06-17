'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store/store';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/shared/header';
import Spinner from '@/components/shared/spinner';

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
  const storeRef = useRef<any>(null);
  const [showHeader, setShowHeader] = useState(false);

  if (!storeRef.current) {
    const preloadedState = {
      cart: {
        items: loadCartFromLocalStorage()
      }
    };
    const clientStore = makeStore(preloadedState);

    clientStore.subscribe(() => {
      const state = clientStore.getState();
      localStorage.setItem('cartItems', JSON.stringify(state.cart.items));
    });

    storeRef.current = clientStore;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHeader(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (!storeRef.current) return null;

  return (
    <Provider store={storeRef.current}>
      <SessionProvider>
        {showHeader ? <Header /> : <Spinner />}
        {children}
      </SessionProvider>
    </Provider>
  );
}
