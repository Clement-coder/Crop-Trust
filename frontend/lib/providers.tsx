'use client';
import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';

import { ProductProvider } from "@/hooks/use-products"
import { CartProvider } from '@/hooks/cartProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cmhtnbswx00zji80cht133de1"
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: '../public/CroptrustLog.png',
        },
        loginMethods: ['google'],
      }}
    >
      <ProductProvider>
        <CartProvider>{children}</CartProvider>
      </ProductProvider>
    </PrivyProvider>
  );
}
