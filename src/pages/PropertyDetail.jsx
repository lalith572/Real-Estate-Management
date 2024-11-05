import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as propertyService from '../api/propertyService';
import Footer from '../pages/Footer'; 
import '../style.css';

const PropertyDetail = () => {
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyService.getPropertyById(id);
        console.log('Fetched Property:', response); 
        setProperty(response);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setError('Failed to fetch property details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleBuy = () => {
    alert('You have chosen to buy this property.');
  };

  const handleInterested = () => {
    alert('You have marked this property as interested.');
  };

  const handleSaveForLater = () => {
    alert('This property has been saved for later.');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading property details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="no-data-container">
        <p>No property data available.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="property-detail-page">
        <div className="property-header">
          <h1>{property.name}</h1>
          <p className="property-address">📍 {property.address}</p>
          <p className="property-price">${property.price.toLocaleString()}</p>
        </div>

        <div className="property-content">
          <div className="property-image-gallery">
            <img
              src={`data:image/jpeg;base64,${property.image}`}
              alt={property.name}
              className="property-main-image"
            />
          </div>

          <div className="property-details">
            <section className="property-description">
              <h2>Description</h2>
              <p>{property.description}</p>
            </section>

            <section className="property-features">
              <h2>Features</h2>
              <ul>
                <li><strong>Size:</strong> {property.dimension}</li>
                <li><strong>Bedrooms:</strong> {property.numberOfBeds}</li>
                <li><strong>Bathrooms:</strong> {property.numberOfBaths}</li>
                <li><strong>Type:</strong> {property.type}</li>
              </ul>
            </section>

            <section className="property-buttons">
              <button className="buy-btn" onClick={handleBuy}>Buy</button>
              <button className="interested-btn" onClick={handleInterested}>Interested</button>
              <button className="save-later-btn" onClick={handleSaveForLater}>Save for Later</button>
            </section>

            <section className="property-map">
              <h2>Location Map</h2>
              <br />
              <div id="map">
                <iframe
                  title="property-location"
                  width="99%"
                  height="290"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`}
                  allowFullScreen
                ></iframe>
                <br /><br />
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PropertyDetail;
