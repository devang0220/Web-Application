import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProfileDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/profiles/${id}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <p>Loading profile details...</p>;
  if (!profile) return <p>Profile not found.</p>;

  return (
    <div>
      <h2>{profile.name}</h2>
      <p>{profile.description}</p>
      <p>Contact: {profile.contact}</p>
      <p>Interests: {profile.interests}</p>
    </div>
  );
}

export default ProfileDetail;