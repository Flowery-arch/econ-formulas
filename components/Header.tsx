"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import styles from './layout.module.css';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Экономика: формулы для демо-экзамена</h1>
      <div className={styles.logoContainer}>
        <Image 
          src="/logo.png" 
          alt="Академия машиностроения имени Ж.Я. Котина" 
          width={200} 
          height={60} 
          className={styles.logo}
          priority
        />
      </div>
    </header>
  );
};

export default Header; 