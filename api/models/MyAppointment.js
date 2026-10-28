import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String },
  email: { type: String },
  phone: { type: String },
  date: { type: String },
  department: { type: String },
  doctor: { type: String },
  message: { type: String },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);