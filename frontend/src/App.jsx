// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProfileList from './components/ProfileList';
import AdminPanel from './components/AdminPanel';
import UsersMapPage from './components/UsersMapPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile-list" element={<ProfileList />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/map-view" element={<UsersMapPage />} />
    </Routes>
  );
}

export default App;