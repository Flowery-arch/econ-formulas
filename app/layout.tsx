import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThemeProviderWrapper from '../components/ThemeProviderWrapper';
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: 'Экономика: формулы для демо-экзамена',
  description: '20 формул для решения задач по экономике на демо экзамене',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icons/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/icons/icon-192.png', sizes: '192x192' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}>
        <ThemeProviderWrapper>
          <Header />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
          </main>
          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
