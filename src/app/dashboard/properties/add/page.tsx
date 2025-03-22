"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../dashboard.module.css';
import propertyStyles from './property-form.module.css';

const AddProperty = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: 'residential',
    status: 'for-sale',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    features: {
      bedrooms: '',
      bathrooms: '',
      squareFeet: '',
      lotSize: '',
      yearBuilt: '',
      parking: '',
      amenities: '',
    },
    images: [
      {
        url: '',
        caption: '',
        isPrimary: true,
      },
    ],
  });

  useEffect(() => {
    // Check if user is logged in and is a realtor or admin
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        
        if (!data.success) {
          router.push('/login');
          return;
        }
        
        if (data.user.role !== 'realtor' && data.user.role !== 'admin') {
          router.push('/dashboard');
          return;
        }
        
        setUser(data.user);
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e, index) => {
    const { name, value } = e.target;
    const updatedImages = [...formData.images];
    
    updatedImages[index] = {
      ...updatedImages[index],
      [name]: value,
    };
    
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [
        ...formData.images,
        {
          url: '',
          caption: '',
          isPrimary: false,
        },
      ],
    });
  };

  const removeImageField = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const handleAmenitiesChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        amenities: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      // Format the data for submission
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        features: {
          ...formData.features,
          bedrooms: formData.features.bedrooms ? parseInt(formData.features.bedrooms) : undefined,
          bathrooms: formData.features.bathrooms ? parseFloat(formData.features.bathrooms) : undefined,
          squareFeet: formData.features.squareFeet ? parseFloat(formData.features.squareFeet) : undefined,
          lotSize: formData.features.lotSize ? parseFloat(formData.features.lotSize) : undefined,
          yearBuilt: formData.features.yearBuilt ? parseInt(formData.features.yearBuilt) : undefined,
          amenities: formData.features.amenities ? formData.features.amenities.split(',').map(item => item.trim()) : [],
        },
      };
      
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setError(data.error || 'Failed to add property');
        return;
      }
      
      // Redirect to the dashboard on success
      router.push('/dashboard');
    } catch (error) {
      console.error('Error adding property:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={propertyStyles.formContainer}>
      <h1>Add New Property</h1>
      
      {error && <div className={propertyStyles.error}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={propertyStyles.propertyForm}>
        <div className={propertyStyles.formSection}>
          <h2>Basic Information</h2>
          
          <div className={propertyStyles.formGroup}>
            <label htmlFor="title">Property Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Luxury Waterfront Home"
            />
          </div>
          
          <div className={propertyStyles.formGroup}>
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Provide a detailed description of the property"
              rows={5}
            />
          </div>
          
          <div className={propertyStyles.formRow}>
            <div className={propertyStyles.formGroup}>
              <label htmlFor="price">Price ($)*</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="e.g., 450000"
              />
            </div>
            
            <div className={propertyStyles.formGroup}>
              <label htmlFor="propertyType">Property Type*</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
            </div>
            
            <div className={propertyStyles.formGroup}>
              <label htmlFor="status">Status*</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className={propertyStyles.formSection}>
          <h2>Address</h2>
          
          <div className={propertyStyles.formGroup}>
            <label htmlFor="address.street">Street Address*</label>
            <input
              type="text"
              id="address.street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
              placeholder="e.g., 123 Main St"
            />
          </div>
          
          <div className={propertyStyles.formRow}>
            <div className={propertyStyles.formGroup}>
              <label htmlFor="address.city">City*</label>
              <input
                type="text"
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                required
                placeholder="e.g., Miami"
              />
            </div>
            
            <div className={propertyStyles.formGroup}>
              <label htmlFor="address.state">State*</label>
              <input
                type="text"
                id="address.state"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                required
                placeholder="e.g., FL"
              />
            </div>
            
            <div className={propertyStyles.formGroup}>
              <label htmlFor="address.zipCode">Zip Code*</label>
              <input
                type="text"
                id="address.zipCode"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
                required
                placeholder="e.g., 33101"
              />
            </div>
          </div>
        </div>
        
        <div className={propertyStyles.formSection}>
          <h2>Features</h2>
          
          <div className={propertyStyles.formRow}>
            {formData.propertyType === 'residential' && (
              <>
                <div className={propertyStyles.formGroup}>
                  <label htmlFor="features.bedrooms">Bedrooms*</label>
                  <input
                    type="number"
                    id="features.bedrooms"
                    name="features.bedrooms"
                    value={formData.features.bedrooms}
                    onChange={handleChange}
                    required={formData.propertyType === 'residential'}
                    min="0"
                    placeholder="e.g., 3"
                  />
                </div>
                
                <div className={propertyStyles.formGroup}>
                  <label htmlFor="features.bathrooms">Bathrooms*</label>
                  <input
                    type="number"
                    id="features.bathrooms"
                    name="features.bathrooms"
                    value={formData.features.bathrooms}
                    onChange={handleChange}
                    required={formData.propertyType === 'residential'}
                    min="0"
                    step="0.5"
                    placeholder="e.g., 2.5"
                  />
                </div>
              </>
            )}
            
            <div className={propertyStyles.formGroup}>
              <label htmlFor="features.squareFeet">Square Feet*</label>
              <input
                type="number"
                id="features.squareFeet"
                name="features.squareFeet"
                value={formData.features.squareFeet}
                onChange={handleChange}
                required
                min="0"
                placeholder="e.g., 2000"
              />
            </div>
          </div>
          
          <div className={propertyStyles.formRow}>
            <div className={propertyStyles.formGroup}>
              <label htmlFor="features.lotSize">Lot Size (acres)</label>
              <input
                type="number"
                id="features.lotSize"
                name="features.lotSize"
                value={formData.features.lotSize}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g., 0.25"
              />
            </div>
            
            <div className={propertyStyles.formGroup}>
              <label htmlFor="features.yearBuilt">Year Built</label>
              <input
                type="number"
                id="features.yearBuilt"
                name="features.yearBuilt"
                value={formData.features.yearBuilt}
                onChange={handleChange}
                min="1800"
                max={new Date().getFullYear()}
                placeholder="e.g., 2005"
              />
            </div>
            
            <div className={propertyStyles.formGroup}>
              <label htmlFor="features.parking">Parking</label>
              <input
                type="text"
                id="features.parking"
                name="features.parking"
                value={formData.features.parking}
                onChange={handleChange}
                placeholder="e.g., 2-Car Garage"
              />
            </div>
          </div>
          
          <div className={propertyStyles.formGroup}>
            <label htmlFor="features.amenities">Amenities (comma-separated)</label>
            <textarea
              id="features.amenities"
              name="features.amenities"
              value={formData.features.amenities}
              onChange={handleAmenitiesChange}
              placeholder="e.g., Pool, Fireplace, Central AC, Hardwood Floors"
              rows={2}
            />
          </div>
        </div>
        
        <div className={propertyStyles.formSection}>
          <h2>Images</h2>
          
          {formData.images.map((image, index) => (
            <div key={index} className={propertyStyles.imageFieldset}>
              <div className={propertyStyles.imageHeader}>
                <h3>Image {index + 1}</h3>
                {index > 0 && (
                  <button
                    type="button"
                    className={propertyStyles.removeButton}
                    onClick={() => removeImageField(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className={propertyStyles.formRow}>
                <div className={propertyStyles.formGroup}>
                  <label htmlFor={`image-url-${index}`}>Image URL*</label>
                  <input
                    type="url"
                    id={`image-url-${index}`}
                    name="url"
                    value={image.url}
                    onChange={(e) => handleImageChange(e, index)}
                    required
                    placeholder="e.g., https://example.com/image.jpg"
                  />
                </div>
                
                <div className={propertyStyles.formGroup}>
                  <label htmlFor={`image-caption-${index}`}>Caption</label>
                  <input
                    type="text"
                    id={`image-caption-${index}`}
                    name="caption"
                    value={image.caption}
                    onChange={(e) => handleImageChange(e, index)}
                    placeholder="e.g., Front view of the house"
                  />
                </div>
              </div>
              
              <div className={propertyStyles.formGroup}>
                <label className={propertyStyles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isPrimary"
                    checked={image.isPrimary}
                    onChange={(e) => {
                      // Uncheck all other images
                      const updatedImages = formData.images.map((img, i) => ({
                        ...img,
                        isPrimary: i === index ? e.target.checked : false,
                      }));
                      
                      setFormData({
                        ...formData,
                        images: updatedImages,
                      });
                    }}
                  />
                  Primary Image (main display image)
                </label>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            className={propertyStyles.addButton}
            onClick={addImageField}
          >
            Add Another Image
          </button>
        </div>
        
        <div className={propertyStyles.formActions}>
          <button
            type="button"
            className={propertyStyles.cancelButton}
            onClick={() => router.push('/dashboard')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={propertyStyles.submitButton}
            disabled={submitting}
          >
            {submitting ? 'Adding Property...' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
