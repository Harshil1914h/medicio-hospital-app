import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctor: { type: String, required: true },
  dept: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "Upcoming" }
});

export default mongoose.model('Appointment', appointmentSchema);