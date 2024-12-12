import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Profile Management</h1>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/profile-list" className="nav-link">Profile List</Link>
        </li>
        <li>
          <Link to="/admin-panel" className="nav-link">Admin Panel</Link>
        </li>
        <li>
          <Link to="/map-view" className="nav-link">Map View</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;