"use client";

import React from 'react';
import styles from '../app/page.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.footerCopyright}>
          © {new Date().getFullYear()} Академия машиностроения имени Ж.Я. Котина
        </p>
        <p className={styles.footerDeveloper}>
          Разработано: <a 
            href="https://neweramamalchik.space/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            neweramamalchik
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 