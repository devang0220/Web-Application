import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/AdminPanel.css"; // Ensure this CSS file is created for styling the admin panel
import Navbar from './Navbar';
import { FaEdit } from 'react-icons/fa'; // Importing an edit icon

function AdminPanel() {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    photo: '',
    description: '',
    address: '',
    contact: '',
    interests: '',
    latitude: '',
    longitude: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetchProfiles();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Generate a unique ID and random coordinates if this is a new profile
      if (!formData.id) {
        formData.id = `profile-${Date.now()}`; // Unique ID using current timestamp
        formData.latitude = (Math.random() * 180 - 90).toFixed(6); // Latitude between -90 and 90
        formData.longitude = (Math.random() * 360 - 180).toFixed(6); // Longitude between -180 and 180
      }
  
      if (formData.id && profiles.find(profile => profile.id === formData.id)) {
        // Update existing profile
        await axios.put(`http://localhost:3000/api/profiles/${formData.id}`, formData);
        alert('Profile updated successfully!');
      } else {
        // Create new profile
        await axios.post('http://localhost:3000/api/profiles', formData);
        alert('Profile created successfully!');
      }
  
      // Reset the form data and close the dialog
      setFormData({
        id: '',
        name: '',
        photo: '',
        description: '',
        address: '',
        contact: '',
        interests: '',
        latitude: '',
        longitude: ''
      });
      setIsDialogOpen(false);
      window.location.reload(); // Refresh the list after submitting
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (profile) => {
    setFormData(profile);
    setIsDialogOpen(true);
  };
  

  const handleDeleteProfile = async (profileId) => {
    try {
      await axios.delete(`http://localhost:3000/api/profiles/${profileId}`);
      alert('Profile deleted successfully!');
      setProfiles(profiles.filter(profile => profile.id !== profileId)); // Update state to remove deleted profile
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleAddNewProfile = () => {
    setFormData({
      id: '',
      name: '',
      photo: '',
      description: '',
      address: '',
      contact: '',
      interests: ''
    });
    setIsDialogOpen(true);
  };

  return (
    <>
      <Navbar />
      <div className="admin-panel">
        <h2>Admin Panel</h2>
       
        <button className="add-profile-btn" onClick={handleAddNewProfile}>
          Add New Profile
        </button>
        <input
          type="text"
          placeholder="Search Profiles"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />

        <div className="profile-grid">
          {filteredProfiles.map(profile => (
            <div key={profile.id} className="profile-card">
              <div>
                <strong>{profile.name}</strong> <br></br> {profile.description}
              </div>
              <div className='buttonClass'>
                <button className="edit-button" onClick={() => handleEdit(profile)}>
                  <FaEdit /> Edit
                </button>
                <button style={{ backgroundColor: "red" }} className="delete-button"  onClick={() => handleDeleteProfile(profile.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {isDialogOpen && (
          <div className="dialog-overlay" onClick={() => setIsDialogOpen(false)}>
            <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    value={formData.photo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    name="interests"
                    placeholder="Interests"
                    value={formData.interests}
                    onChange={handleChange}
                  />
                </div>
                <div className="button-container">
                  <button type="submit">{formData.id ? 'Update Profile' : 'Add Profile'}</button>
                  <button type="button" style={{ backgroundColor: "#1A1A19" }} className="close-button" onClick={() => setIsDialogOpen(false)}>Close</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminPanel;