"use client";

import React from 'react';
import styles from '../styles/Testimonials.module.css';

const Testimonials = () => {
  // Mock data for testimonials
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Home Buyer',
      quote: 'Working with this team was an absolute pleasure. They found us our dream home within our budget and made the entire process smooth and stress-free.',
      image: '/images/testimonial1.jpg',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Property Investor',
      quote: "As an investor, I appreciate their market knowledge and attention to detail. They've helped me acquire multiple profitable properties over the years.",
      image: '/images/testimonial2.jpg',
    },
    {
      id: 3,
      name: 'Emily and David Thompson',
      role: 'Home Sellers',
      quote: "We sold our home for well above asking price thanks to their excellent marketing strategy and negotiation skills. Couldn't be happier with the results!",
      image: '/images/testimonial3.jpg'
    },
  ];

  return (
    <section className={styles.testimonialSection}>
      <div className="container">
        <h2 className={styles.title}>What Our Clients Say</h2>
        <p className={styles.subtitle}>Hear from the people who have worked with us</p>
        
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.testimonialContent}>
                <div className={styles.quoteMark}>"</div>
                <p className={styles.quote}>{testimonial.quote}</p>
                <div className={styles.profile}>
                  <div className={styles.avatarPlaceholder}></div>
                  <div className={styles.info}>
                    <h4 className={styles.name}>{testimonial.name}</h4>
                    <p className={styles.role}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.ctaContainer}>
          <p className={styles.ctaText}>Ready to have a similar experience?</p>
          <a href="/contact" className={`btn btn-primary ${styles.ctaButton}`}>
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
