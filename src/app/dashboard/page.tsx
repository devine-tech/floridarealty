"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        if (!data.success) {
          router.push('/login');
          return;
        }
        
        setUser(data.user);
        
        // Fetch properties if user is a realtor or admin
        if (data.user.role === 'realtor' || data.user.role === 'admin') {
          fetchProperties();
        }
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      const data = await response.json();
      
      if (data.success) {
        // Filter properties by realtor if user is a realtor
        if (user && user.role === 'realtor') {
          setProperties(data.data.filter(property => property.realtor._id === user._id));
        } else {
          setProperties(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return <div className={styles.unauthorized}>Please log in to access the dashboard</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>Welcome, {user.name}!</p>
      </div>
      
      {(user.role === 'realtor' || user.role === 'admin') && (
        <div className={styles.actions}>
          <Link href="/dashboard/properties/add" className={styles.addButton}>
            Add New Property
          </Link>
        </div>
      )}
      
      {(user.role === 'realtor' || user.role === 'admin') && (
        <div className={styles.propertiesSection}>
          <h2>Your Properties</h2>
          
          {properties.length === 0 ? (
            <p>No properties found. Add your first property!</p>
          ) : (
            <div className={styles.propertiesGrid}>
              {properties.map((property) => (
                <div key={property._id} className={styles.propertyCard}>
                  <div className={styles.propertyImage}>
                    {property.images && property.images.length > 0 ? (
                      <img 
                        src={property.images.find(img => img.isPrimary)?.url || property.images[0].url} 
                        alt={property.title} 
                      />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                  </div>
                  <div className={styles.propertyInfo}>
                    <h3>{property.title}</h3>
                    <p className={styles.propertyPrice}>${property.price.toLocaleString()}</p>
                    <p className={styles.propertyAddress}>
                      {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
                    </p>
                    <div className={styles.propertyMeta}>
                      <span>{property.propertyType}</span>
                      <span className={styles.statusBadge}>{property.status}</span>
                    </div>
                    <div className={styles.propertyActions}>
                      <Link href={`/dashboard/properties/edit/${property._id}`} className={styles.editButton}>
                        Edit
                      </Link>
                      <Link href={`/properties/${property._id}`} className={styles.viewButton}>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
