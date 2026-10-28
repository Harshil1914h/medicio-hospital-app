import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String },
  medicines: [
    {
      name: { type: String },
      dosage: { type: String },
      duration: { type: String },
      instruction: { type: String }
    }
  ]
});

export default mongoose.model('Prescription', prescriptionSchema);