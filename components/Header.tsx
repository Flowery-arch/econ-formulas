"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const themes = [
  { value: 'light', label: 'Светлая', icon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="5" fill="#FFD600"/><circle cx="10" cy="10" r="9" stroke="#FFD600" strokeWidth="2"/></svg>
  ) },
  { value: 'dark', label: 'Тёмная', icon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 10A5 5 0 0 1 7 15.66 7 7 0 1 0 15 10Z" fill="#222"/></svg>
  ) },
  { value: 'system', label: 'Авто', icon: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#888" strokeWidth="2"/><path d="M10 3v14M3 10h14" stroke="#888" strokeWidth="2"/></svg>
  ) },
];

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
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
      <div style={{ display: 'flex', gap: 8 }}>
        {mounted && themes.map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            style={{
              background: theme === t.value ? '#222' : 'transparent',
              border: 'none',
              borderRadius: 4,
              padding: 4,
              cursor: 'pointer',
              outline: theme === t.value ? '2px solid #888' : 'none',
              transition: 'background 0.2s',
            }}
            aria-label={t.label}
            title={t.label}
          >
            {t.icon}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header; 