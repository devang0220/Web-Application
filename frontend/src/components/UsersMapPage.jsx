import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet for custom icons
import '../styles/UsersMapPage.css';
import Navbar from './Navbar';

function UsersMapPage() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from API (replace with your actual API endpoint)
        const response = await axios.get('http://localhost:3000/api/profiles');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Function to create circular user marker with photo
  const createUserMarkerIcon = (photoUrl) => {
    return new L.divIcon({
      className: 'user-photo-marker', // Apply CSS class to style the marker
      html: `<img src="${photoUrl}" alt="user photo" class="user-photo" />`,
      iconSize: [40, 40], // Size of the circle (adjust as needed)
      iconAnchor: [20, 40], // Adjust the point of the icon that gets placed at the marker
      popupAnchor: [0, -40], // Adjust the popup position relative to the marker
    });
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="map-page-container">
      
      <MapContainer
        center={[28.7041, 77.1025]} // Default center (you can change this to fit your needs)
        zoom={5}
        style={{ height: '80vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userData.map((user) => (
          <Marker
            key={user.id}
            position={[parseFloat(user.latitude), parseFloat(user.longitude)]}
            icon={createUserMarkerIcon(user.photo)} // Custom icon with user photo
          >
            <Popup>{user.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
    </>
  );
}

export default UsersMapPage;