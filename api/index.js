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

// Cache MongoDB connection across Vercel serverless invocations
let isConnected = false;
const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  const uri = process.env.MONGO_URI;
  if (!uri) {
    return;
  }
  try {
    const db = await mongoose.connect(uri, {
      bufferCommands: false,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
  }
};

// Middleware to establish DB connection when MONGO_URI is set
app.use(async (req, res, next) => {
  if (process.env.MONGO_URI && !isConnected) {
    await connectDB();
  }
  next();
});

// Health check endpoint
app.get(['/api', '/'], (req, res) => {
  res.json({
    status: "ok",
    service: "Medicio Hospital API",
    database: mongoose.connection.readyState === 1 ? "Connected" : "Demo/Fallback Mode"
  });
});

// Mount Routes (supporting both /api/xxx and /xxx for rewrite compatibility)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/appointments', appointmentRoutes);
app.use('/appointments', appointmentRoutes);

app.use('/api/medicines', medicineRoutes);
app.use('/medicines', medicineRoutes);

app.use('/api/doctors', doctorRoutes);
app.use('/doctors', doctorRoutes);

app.use('/api/contacts', contactRoutes);
app.use('/contacts', contactRoutes);

app.use('/api', patientDashboardRoutes);
app.use('/', patientDashboardRoutes);

export default app;
