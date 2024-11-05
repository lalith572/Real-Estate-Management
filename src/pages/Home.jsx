import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../pages/Footer';
import * as propertyService from '../api/propertyService';
import '../style.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await propertyService.getProperties(); 

        if (Array.isArray(response)) {
          setProperties(response);
        } else {
          console.error('Unexpected data format:', response);
          setError('Failed to load properties. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
      }
    };

    fetchProperties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const filteredProperties = properties.filter(property =>
      property.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProperties(filteredProperties);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <h1>Find Your Dream Property</h1>
      <br />
      <div className="quote-section">
        <p>"Home is the starting place of love, hope, and dreams."</p>
        <p>"The magic thing about home is that it feels good to leave, and it feels even better to come back."</p>
        <p>"Your home should tell the story of who you are, and be a collection of what you love."</p>
      </div>
      <br />
      
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for properties"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

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

export default Home;
