"use client";

import React from 'react';
import styles from '../styles/CommercialProperties.module.css';

const CommercialProperties = () => {
  // Mock data for commercial properties
  const commercialProperties = [
    {
      id: 1,
      title: 'Downtown Office Space',
      location: 'Tampa, FL',
      price: '$1,200,000',
      type: 'Office',
      size: '3,500 sq ft',
      image: '/images/commercial1.jpg',
    },
    {
      id: 2,
      title: 'Retail Space in Shopping Center',
      location: 'Jacksonville, FL',
      price: '$850,000',
      type: 'Retail',
      size: '2,200 sq ft',
      image: '/images/commercial2.jpg',
    },
    {
      id: 3,
      title: 'Industrial Warehouse',
      location: 'Orlando, FL',
      price: '$1,950,000',
      type: 'Industrial',
      size: '12,000 sq ft',
      image: '/images/commercial3.jpg',
    },
  ];

  return (
    <section className={styles.commercialSection}>
      <div className="container">
        <h2 className={styles.title}>Commercial Properties</h2>
        <p className={styles.subtitle}>Explore our selection of commercial properties for sale or lease</p>
        
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>All</button>
          <button className={styles.tab}>Office</button>
          <button className={styles.tab}>Retail</button>
          <button className={styles.tab}>Industrial</button>
          <button className={styles.tab}>Land</button>
        </div>
        
        <div className={styles.propertiesGrid}>
          {commercialProperties.map((property) => (
            <div key={property.id} className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <div className={styles.imagePlaceholder}></div>
                <span className={styles.propertyType}>{property.type}</span>
              </div>
              <div className={styles.propertyContent}>
                <h3 className={styles.propertyTitle}>{property.title}</h3>
                <p className={styles.propertyLocation}>{property.location}</p>
                <div className={styles.propertyDetails}>
                  <div className={styles.propertyPrice}>{property.price}</div>
                  <div className={styles.propertySize}>{property.size}</div>
                </div>
                <a href={`/commercial/${property.id}`} className={styles.viewDetails}>
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.viewAllContainer}>
          <a href="/commercial" className={`btn btn-primary ${styles.viewAllBtn}`}>
            View All Commercial Properties
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommercialProperties;
