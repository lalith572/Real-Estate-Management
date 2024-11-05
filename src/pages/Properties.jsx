import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as propertyService from '../api/propertyService'; 
import '../style.css';
import Footer from './Footer';

const PropertiesListing = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertiesData = await propertyService.getProperties();
        
        if (Array.isArray(propertiesData)) {
          setProperties(propertiesData);
        } else {
          console.error('Unexpected data format:', propertiesData);
          setError('Unexpected data format received.');
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to fetch properties.');
      }
    };

    fetchProperties();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="properties-listing-page">
      <h1>Available Properties</h1>
      <div className="properties-list">
        {properties.length > 0 ? (
          properties.map((property) => (
            <Link to={`/property/${property.id}`} key={property.id} className="property-card-link">
              <div className="property-card">
                <img src={`data:image/jpeg;base64,${property.image}`} alt={property.name} className="property-image" />
                <div className="property-info">
                  <h3>{property.name}</h3>
                  <p className="property-price">${property.price}</p>
                  <p><strong>Dimensions:</strong> {property.dimension}</p>
                  <p><strong>Location:</strong> {property.location}</p>
                  <p className="property-description">{property.description}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No properties available.</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default PropertiesListing;
