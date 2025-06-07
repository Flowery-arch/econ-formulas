import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import Header from '../components/Header';
import ThemeProviderWrapper from '../components/ThemeProviderWrapper';
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: 'Экономика: формулы для демо-экзамена',
  description: '20 формул для решения задач по экономике на демо экзамене',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <ThemeProviderWrapper>
          <Header />
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
