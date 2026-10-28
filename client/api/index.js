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

// CORS — allow all origins (Vercel + local dev)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// ─── MongoDB Connection (cached across serverless invocations) ───────────────
let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }
  const uri = process.env.MONGO_URI;
  if (!uri || uri.includes('localhost') || uri.includes('127.0.0.1')) {
    console.log('No cloud MONGO_URI — running in fallback/demo mode');
    return;
  }
  try {
    await mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 5000 });
    isConnected = true;
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    isConnected = false;
    console.error('MongoDB Connection Error:', err.message);
  }
};

// Attempt DB connection on every request (cached after first success)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/api', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Medicio Hospital API',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Demo/Fallback Mode',
  });
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api', patientDashboardRoutes);

// ─── 404 fallback ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

// ─── Export for Vercel serverless ────────────────────────────────────────────
export default app;
