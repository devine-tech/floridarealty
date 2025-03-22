"use client";

import React, { useState } from 'react';
import styles from '../styles/PropertySearch.module.css';

const PropertySearch = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would trigger a search with the form data
    console.log({ location, propertyType, priceRange, bedrooms, bathrooms });
  };

  return (
    <section className={styles.searchSection} id="property-search">
      <div className="container">
        <h2 className={styles.title}>Find Your Perfect Home</h2>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              placeholder="City, Zip, or Address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="propertyType">Property Type</label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Any</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="apartment">Apartment</option>
              <option value="land">Land</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="priceRange">Price Range</label>
            <select
              id="priceRange"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">Any</option>
              <option value="100000-200000">$100k - $200k</option>
              <option value="200000-300000">$200k - $300k</option>
              <option value="300000-500000">$300k - $500k</option>
              <option value="500000-750000">$500k - $750k</option>
              <option value="750000-1000000">$750k - $1M</option>
              <option value="1000000+">$1M+</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="bedrooms">Bedrooms</label>
            <select
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="bathrooms">Bathrooms</label>
            <select
              id="bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          
          <button type="submit" className={`btn btn-primary ${styles.searchButton}`}>
            Search Properties
          </button>
        </form>
      </div>
    </section>
  );
};

export default PropertySearch;
