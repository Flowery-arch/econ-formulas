"use client";

import React from 'react';
import styles from '../app/page.module.css';

const Footer: React.FC = () => {
  return (
    <footer style={{
      width: '100%',
      padding: '20px 0',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: 'auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <p style={{
          margin: 0,
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          © {new Date().getFullYear()} Академия машиностроения имени Ж.Я. Котина
        </p>
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.5)'
        }}>
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