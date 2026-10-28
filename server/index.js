import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'; 
import appointmentRoutes from './routes/myappointmentRoutes.js';
import medicineRoutes from './routes/medicineRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medicines', medicineRoutes);

// MongoDB કનેક્શન
mongoose.connect('mongodb://localhost:27017/medicio')
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));