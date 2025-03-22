"use client";

import React from 'react';
import styles from '../styles/FeaturedProperties.module.css';

// Mock data for featured properties
const featuredProperties = [
  {
    id: 1,
    title: 'Luxury Waterfront Villa',
    location: 'Miami Beach, FL',
    price: '$2,450,000',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    image: '/images/property1.jpg',
  },
  {
    id: 2,
    title: 'Modern Downtown Condo',
    location: 'Orlando, FL',
    price: '$425,000',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image: '/images/property2.jpg',
  },
  {
    id: 3,
    title: 'Beachfront Paradise',
    location: 'Naples, FL',
    price: '$1,850,000',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3100,
    image: '/images/property3.jpg',
  },
];

const FeaturedProperties = () => {
  return (
    <section className={styles.featuredSection}>
      <div className="container">
        <h2 className={styles.title}>Featured Properties</h2>
        <p className={styles.subtitle}>Discover our handpicked selection of premium properties</p>
        
        <div className={styles.propertiesGrid}>
          {featuredProperties.map((property) => (
            <div key={property.id} className={styles.propertyCard}>
              <div className={styles.propertyImage}>
                <div className={styles.imagePlaceholder}></div>
                <span className={styles.propertyPrice}>{property.price}</span>
              </div>
              <div className={styles.propertyContent}>
                <h3 className={styles.propertyTitle}>{property.title}</h3>
                <p className={styles.propertyLocation}>{property.location}</p>
                <div className={styles.propertyDetails}>
                  <span>{property.bedrooms} Beds</span>
                  <span>{property.bathrooms} Baths</span>
                  <span>{property.sqft.toLocaleString()} Sq Ft</span>
                </div>
                <a href={`/properties/${property.id}`} className={styles.viewDetails}>
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.viewAllContainer}>
          <a href="/properties" className={`btn btn-primary ${styles.viewAllBtn}`}>
            View All Properties
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
