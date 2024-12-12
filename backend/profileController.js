// controllers/profileController.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/profiles.json');

// Helper function to read the JSON file
const readProfiles = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Helper function to write to the JSON file
const writeProfiles = (profiles) => {
  fs.writeFileSync(filePath, JSON.stringify(profiles, null, 2));
};

// Get all profiles
export const getAllProfiles = (req, res) => {
  try {
    const profiles = readProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Error reading profiles', error });
  }
};

// Get a profile by ID
export const getProfileById = (req, res) => {
  try {
    const profiles = readProfiles();
    const profile = profiles.find(p => p.id === req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error reading profile', error });
  }
};

// Create a new profile
export const createProfile = (req, res) => {
  try {
    const profiles = readProfiles();
    const newProfile = { id: Date.now().toString(), ...req.body };
    profiles.push(newProfile);
    writeProfiles(profiles);
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error creating profile', error });
  }
};

// Update a profile by ID
export const updateProfile = (req, res) => {
  try {
    const profiles = readProfiles();
    const profileIndex = profiles.findIndex(p => p.id === req.params.id);
    if (profileIndex === -1) return res.status(404).json({ message: 'Profile not found' });

    profiles[profileIndex] = { ...profiles[profileIndex], ...req.body };
    writeProfiles(profiles);
    res.status(200).json(profiles[profileIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

// Delete a profile by ID
export const deleteProfile = (req, res) => {
  try {
    const profiles = readProfiles();
    const updatedProfiles = profiles.filter(p => p.id !== req.params.id);
    if (profiles.length === updatedProfiles.length) return res.status(404).json({ message: 'Profile not found' });

    writeProfiles(updatedProfiles);
    res.status(200).json({ message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile', error });
  }
};