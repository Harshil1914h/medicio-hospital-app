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
app.use(express.json());
app.use(cors());

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

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/medicio';
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
