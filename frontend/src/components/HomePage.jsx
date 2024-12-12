import React from 'react';
import { Link } from 'react-router-dom';
import ProfileList from "../components/ProfileList";
import '../styles/HomePage.css'; // Separate CSS for styling
import Navbar from './Navbar';

function HomePage() {
  return (
    
      <div className="content">
        <ProfileList></ProfileList>
      </div>
   
  );
}

export default HomePage;