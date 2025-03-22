"use client";

import React from 'react';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Find Your Dream Home in Florida</h1>
        <p className={styles.subtitle}>
          Discover the perfect property with our expert real estate services
        </p>
        <div className={styles.buttons}>
          <a href="#property-search" className={`btn btn-primary ${styles.btn}`}>
            Search Properties
          </a>
          <a href="/contact" className={`btn btn-secondary ${styles.btn}`}>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
