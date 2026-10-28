import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoutes.js'; 
import appointmentRoutes from './routes/myappointmentRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import patientDashboardRoutes from './routes/patientDashboardRoutes.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Configure CORS - adjust the origin array as per your client URL(s)
const allowedOrigins = ['http://localhost:3000', 'http://yourproductiondomain.com']; // example origins
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  }
}));

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Medicio API is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api', patientDashboardRoutes);

// MongoDB connection settings to avoid deprecation warnings
mongoose.set('strictQuery', true);

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/medicio';
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Error:", err.message));

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down server...');
  mongoose.connection.close(false, () => {
    console.log('MongoDB connection closed.');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;
