"use client";

import React from 'react';
import styles from '../styles/SoldProperties.module.css';

const SoldProperties = () => {
  // Mock data for sold properties
  const soldProperties = [
    {
      id: 1,
      title: 'Luxury Beach House',
      location: 'Miami Beach, FL',
      price: '$3,200,000',
      soldDate: 'January 2025',
      image: '/images/sold1.jpg',
    },
    {
      id: 2,
      title: 'Modern Family Home',
      location: 'Tampa, FL',
      price: '$750,000',
      soldDate: 'December 2024',
      image: '/images/sold2.jpg',
    },
    {
      id: 3,
      title: 'Waterfront Condo',
      location: 'Fort Lauderdale, FL',
      price: '$1,100,000',
      soldDate: 'November 2024',
      image: '/images/sold3.jpg',
    },
    {
      id: 4,
      title: 'Gated Community Villa',
      location: 'Orlando, FL',
      price: '$925,000',
      soldDate: 'October 2024',
      image: '/images/sold4.jpg',
    },
  ];

  return (
    <section className={styles.soldSection}>
      <div className="container">
        <h2 className={styles.title}>Recently Sold Properties</h2>
        <p className={styles.subtitle}>A showcase of our successful transactions</p>
        
        <div className={styles.soldGrid}>
          {soldProperties.map((property) => (
            <div key={property.id} className={styles.soldCard}>
              <div className={styles.soldImage}>
                <div className={styles.imagePlaceholder}></div>
                <div className={styles.soldBadge}>SOLD</div>
              </div>
              <div className={styles.soldContent}>
                <h3 className={styles.soldTitle}>{property.title}</h3>
                <p className={styles.soldLocation}>{property.location}</p>
                <div className={styles.soldDetails}>
                  <div className={styles.soldPrice}>{property.price}</div>
                  <div className={styles.soldDate}>Sold: {property.soldDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.testimonial}>
          <blockquote className={styles.quote}>
            "Our agent went above and beyond to sell our property quickly and for a great price. The marketing strategy and negotiation skills were exceptional!"
          </blockquote>
          <cite className={styles.author}>- The Johnson Family</cite>
        </div>
        
        <div className={styles.viewAllContainer}>
          <a href="/sold" className={`btn btn-primary ${styles.viewAllBtn}`}>
            View All Sold Properties
          </a>
        </div>
      </div>
    </section>
  );
};

export default SoldProperties;
