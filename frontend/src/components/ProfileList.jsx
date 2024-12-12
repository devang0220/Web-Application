import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/ProfileList.css'; // Import the CSS file

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/profiles');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div>
      <Navbar />
      
      {loading ? (
        <p>Loading profiles...</p>
      ) : (
        <div className="profile-list">
          {profiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileList;