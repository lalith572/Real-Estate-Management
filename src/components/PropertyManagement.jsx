import React, { useState, useEffect } from 'react';
import { getProperties, addProperty, updateProperty, deleteProperty } from '../api/propertyService';
import '../style.css';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [image,setImage]= useState("");
  const [newProperty, setNewProperty] = useState({
    name: '',
    dimension: '',
    numberOfBeds: '',
    numberOfBaths: '',
    price: '',
    location: '',
    address: '',
    description: '',
    type: 'Residential',
  });
  const [editingProperty, setEditingProperty] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyList = await getProperties();
        setProperties(propertyList);
        setFilteredProperties(propertyList);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter(
      (property) =>
        property.name &&
        property.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchQuery, properties]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
    setError('');
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        const formData = new FormData();
        formData.append('propertyJson', JSON.stringify(newProperty));
        if (image) {
            formData.append('image', image);
        } else {
            throw new Error('Image file is required.');
        }

        if (editingProperty) {
            await updateProperty(editingProperty.id, formData);
            alert('Property updated successfully!');
        } else {
            await addProperty(formData);
            alert('Property added successfully!');
        }

        const updatedProperties = await getProperties();
        setProperties(updatedProperties);
        setFilteredProperties(updatedProperties);
        resetForm();
        setShowForm(false);
    } catch (error) {
        console.error('Error saving property:', error);
        setError('Error saving property!'); 
    } finally {
        setIsLoading(false);
    }
};

  const handleEdit = (property) => {
    setEditingProperty(property);
    setNewProperty(property);
    setShowForm(true);
  };

  const handleDelete = async (propertyId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this property?');
    if (confirmDelete) {
      try {
        await deleteProperty(propertyId);
        const updatedProperties = await getProperties();
        setProperties(updatedProperties);
        setFilteredProperties(updatedProperties);
      } catch (error) {
        setError('Error deleting property!');
      }
    }
  };

  const resetForm = () => {
    setNewProperty({
      name: '',
      dimension: '',
      numberOfBeds: '',
      numberOfBaths: '',
      price: '',
      location: '',
      address: '',
      description: '',
      type: 'Residential',
    });
    setEditingProperty(null);
    setError('');
  };

  return (
    <div className="property-management">
      <h2>Property Management</h2>

      <br/>
      <div className="search-add-bar">
        <input
          type="text"
          placeholder="Search Property by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setShowForm(!showForm)} className="add-property-button">
          {showForm ? 'Hide Form' : 'Add Property'}
        </button>
      </div>

      {showForm && (
        <form className="property-form" onSubmit={handleSubmit}>
          <h3>{editingProperty ? 'Edit Property' : 'Add New Property'}</h3>
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProperty.name}
              onChange={handleChange}
              placeholder="Property Name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="dimension">Dimension:</label>
            <input
              type="text"
              id="dimension"
              name="dimension"
              value={newProperty.dimension}
              onChange={handleChange}
              placeholder="Property Dimension"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="beds">Number of Beds:</label>
            <input
              type="number"
              id="beds"
              name="numberOfBeds"
              value={newProperty.numberOfBeds}
              onChange={handleChange}
              placeholder="Number of Beds"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="baths">Number of Baths:</label>
            <input
              type="number"
              id="baths"
              name="numberOfBaths"
              value={newProperty.numberOfBaths}
              onChange={handleChange}
              placeholder="Number of Baths"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProperty.price}
              onChange={handleChange}
              placeholder="Property Price"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newProperty.location}
              onChange={handleChange}
              placeholder="Property Location"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={newProperty.address}
              onChange={handleChange}
              placeholder="Property Address"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={newProperty.description}
              onChange={handleChange}
              placeholder="Property Description"
              required
            />
          </div>
          <fieldset className="property-form-fieldset">
            <legend className="property-form-legend">Select Type:</legend>
            <label className="property-form-radio-label">
              <input
                type="radio"
                name="type"
                value="Residential"
                checked={newProperty.type === 'Residential'}
                onChange={handleChange}
                className="property-form-radio-input"
              />
              Residential
            </label>
            <label className="property-form-radio-label">
              <input
                type="radio"
                name="type"
                value="Commercial"
                checked={newProperty.type === 'Commercial'}
                onChange={handleChange}
                className="property-form-radio-input"
              />
              Commercial
            </label>
          </fieldset>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : editingProperty ? 'Update Property' : 'Add Property'}
          </button>
          {editingProperty && (
            <button type="button" onClick={resetForm} className="reset-button">
              Cancel
            </button>
          )}
        </form>
      )}

      <h3>Existing Properties</h3>
      <table className="property-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Dimension</th>
            <th>Beds</th>
            <th>Baths</th>
            <th>Price</th>
            <th>Image</th>
            <th>Location</th>
            <th>Address</th>
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProperties.map((property) => (
            <tr key={property.id}>
              <td>{property.name}</td>
              <td>{property.dimension}</td>
              <td>{property.numberOfBeds}</td>
              <td>{property.numberOfBaths}</td>
              <td>{property.price}</td>
              <td>
                {property.image ? (
                  <img src={`data:image/jpeg;base64,${property.image}`} alt={property.name} className="property-image" />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{property.location}</td>
              <td>{property.address}</td>
              <td>{property.description}</td>
              <td>{property.type}</td>
              <td>
                <button onClick={() => handleEdit(property)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(property.id)} className="delBtn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyManagement;
