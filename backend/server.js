import express from 'express';
import cors from 'cors';
import profileRoutes from './routes/profileRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/profiles', profileRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Server is ready');
});

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is serving on port", port);
});