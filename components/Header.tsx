"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: 64,
      background: 'var(--background-dark, #0a0a0a)',
      color: 'var(--foreground, #fff)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Экономика: формулы для демо-экзамена</h1>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        minWidth: '200px'
      }}>
        <Image 
          src="/logo.png" 
          alt="Академия машиностроения имени Ж.Я. Котина" 
          width={200} 
          height={60} 
          style={{ 
            objectFit: 'contain',
            maxHeight: '60px'
          }}
          priority
        />
      </div>
    </header>
  );
};

export default Header; 