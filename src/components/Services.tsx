"use client";

import React from 'react';
import styles from '../styles/Services.module.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Property Buying',
      description: 'Our expert agents will guide you through the entire buying process, from property search to closing.',
      icon: '🏠',
    },
    {
      id: 2,
      title: 'Property Selling',
      description: 'Get the best price for your property with our strategic marketing and negotiation expertise.',
      icon: '💰',
    },
    {
      id: 3,
      title: 'Property Management',
      description: 'Let us handle the day-to-day operations of your investment properties for maximum returns.',
      icon: '🔑',
    },
    {
      id: 4,
      title: 'Investment Consulting',
      description: 'Make informed investment decisions with our market analysis and investment strategy services.',
      icon: '📈',
    },
    {
      id: 5,
      title: 'Commercial Real Estate',
      description: 'Specialized services for buying, selling, and leasing commercial properties across Florida.',
      icon: '🏢',
    },
    {
      id: 6,
      title: 'Mortgage Services',
      description: 'Connect with our trusted network of lenders to secure the best financing options for your purchase.',
      icon: '📝',
    },
  ];

  return (
    <section className={styles.servicesSection}>
      <div className="container">
        <h2 className={styles.title}>Our Services</h2>
        <p className={styles.subtitle}>Comprehensive real estate services tailored to your needs</p>
        
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <a href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`} className={styles.learnMore}>
                Learn More
              </a>
            </div>
          ))}
        </div>
        
        <div className={styles.ctaContainer}>
          <h3 className={styles.ctaTitle}>Ready to work with us?</h3>
          <p className={styles.ctaText}>
            Contact our team today to discuss how we can help with your real estate needs.
          </p>
          <a href="/contact" className={`btn btn-primary ${styles.ctaButton}`}>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
