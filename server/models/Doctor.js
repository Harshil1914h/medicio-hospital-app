import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  schedule: { type: String, default: "09:00 AM - 05:00 PM" },
  experience: { type: String, default: "10 Years" }, // Added for homepage
  image: { type: String, default: "https://via.placeholder.com/150" } // Added for homepage
});

export default mongoose.model('Doctor', doctorSchema);