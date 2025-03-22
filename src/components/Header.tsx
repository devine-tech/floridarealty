"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <h1>Florida Realty</h1>
          </Link>
        </div>

        <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
          <span className={styles.menuIcon}></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/properties" className={styles.navLink}>Properties</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/commercial" className={styles.navLink}>Commercial</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/services" className={styles.navLink}>Services</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/sold" className={styles.navLink}>Sold Properties</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>About Us</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.contact}>
          <a href="tel:+1234567890" className={styles.phone}>
            (123) 456-7890
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
