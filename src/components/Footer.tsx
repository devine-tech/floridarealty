"use client";

import React from 'react';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerLogo}>Florida Realty</h3>
            <p className={styles.footerDescription}>
              Your trusted partner in Florida real estate, helping you find your dream property since 2005.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <span className={styles.socialIcon}>📱</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <span className={styles.socialIcon}>📱</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <span className={styles.socialIcon}>📱</span>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <span className={styles.socialIcon}>📱</span>
              </a>
            </div>
          </div>
          
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/" className={styles.footerLink}>Home</Link>
              </li>
              <li>
                <Link href="/properties" className={styles.footerLink}>Properties</Link>
              </li>
              <li>
                <Link href="/commercial" className={styles.footerLink}>Commercial</Link>
              </li>
              <li>
                <Link href="/services" className={styles.footerLink}>Services</Link>
              </li>
              <li>
                <Link href="/sold" className={styles.footerLink}>Sold Properties</Link>
              </li>
              <li>
                <Link href="/about" className={styles.footerLink}>About Us</Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footerLink}>Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Services</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/services#property-buying" className={styles.footerLink}>Property Buying</Link>
              </li>
              <li>
                <Link href="/services#property-selling" className={styles.footerLink}>Property Selling</Link>
              </li>
              <li>
                <Link href="/services#property-management" className={styles.footerLink}>Property Management</Link>
              </li>
              <li>
                <Link href="/services#investment-consulting" className={styles.footerLink}>Investment Consulting</Link>
              </li>
              <li>
                <Link href="/services#commercial-real-estate" className={styles.footerLink}>Commercial Real Estate</Link>
              </li>
              <li>
                <Link href="/services#mortgage-services" className={styles.footerLink}>Mortgage Services</Link>
              </li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h4 className={styles.footerHeading}>Contact Us</h4>
            <address className={styles.contactInfo}>
              <p>123 Main Street</p>
              <p>Miami, FL 33101</p>
              <p>Email: info@floridarealtybroker.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
            <div className={styles.newsletter}>
              <h4 className={styles.newsletterHeading}>Subscribe to our newsletter</h4>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterButton}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Florida Realty. All rights reserved.
          </p>
          <div className={styles.footerBottomLinks}>
            <Link href="/privacy-policy" className={styles.footerBottomLink}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className={styles.footerBottomLink}>
              Terms of Service
            </Link>
            <Link href="/sitemap" className={styles.footerBottomLink}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
