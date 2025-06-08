"use client";

import React from 'react';
import pageStyles from '../app/page.module.css';
import styles from './layout.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Академия машиностроения имени Ж.Я. Котина
        </p>
        <p className={styles.developer}>
          Разработано: <a 
            href="https://neweramamalchik.space/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={pageStyles.footerLink}
          >
            neweramamalchik
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 