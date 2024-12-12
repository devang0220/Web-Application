import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; 
import '../styles/ProfileCard.css'; 
import { FaTimes } from 'react-icons/fa'; 

function ProfileCard({ profile }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSummaryClick = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteProfile = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/profiles/${profile.id}`);
      alert('Profile deleted successfully!');
      window.location.reload(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };
  const handleViewMap = () => {
    navigate('/map-view'); // Navigate to the /map-view route
  };


  return (
    <>
    
      <div className="profile-card">
        <div className="profile-img-container">
          <img src={profile.photo} alt={`${profile.name}'s avatar`} />
        </div>
        <h3 className="profile-name">{profile.name}</h3>
        <p className="profile-description">{profile.description}</p>
        <div className="button-group">
          <button className="btn summary-btn" onClick={handleSummaryClick}>
            Summary
          </button>
          <button style={{ backgroundColor: "#AD51FC" }} className="btn delete-btn" onClick={handleViewMap}>
            View on map
          </button>
        </div>
      </div>

      {/* Dialog box for profile details */}
      {isDialogOpen && (
        <div className="dialog-overlay" onClick={() => setIsDialogOpen(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-icon"
              onClick={() => setIsDialogOpen(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#000',
                fontSize: '24px',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.color = '#ff0000'}
              onMouseOut={(e) => e.target.style.color = '#000'}
            >
              <FaTimes />
            </button>
            <h2 style={{ textAlign: "center" }}>Profile Details</h2>
            <img src={profile.photo} alt={`${profile.name}'s avatar`} className="dialog-profile-photo" />

            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Contact:</strong> {profile.contact}</p>
            <p><strong>Interests:</strong> {profile.interests}</p>

            {/* Map integration */}
            <div className="map-container">
              <MapContainer
                center={[profile.latitude, profile.longitude]}
                zoom={13}
                style={{ height: '300px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[profile.latitude, profile.longitude]}>
                  <Popup>{profile.name}'s Location</Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* <button className="btn close-btn" onClick={() => setIsDialogOpen(false)}>
              Close
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCard;