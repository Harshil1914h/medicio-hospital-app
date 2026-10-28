import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  medicineId: { type: String, required: true },
  name: { type: String, required: true },
  genericName: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true }
});

export default mongoose.model('Medicine', medicineSchema);