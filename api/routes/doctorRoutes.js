import express from 'express';
import Doctor from '../models/Doctor.js';
import mongoose from 'mongoose';

const router = express.Router();

const demoDoctors = [
  { _id: 'doc_1', name: "Dr. Walter White", specialty: "Cardiology", department: "Cardiology", experience: "15 years", availability: "Mon - Fri" },
  { _id: 'doc_2', name: "Dr. Sarah Smith", specialty: "Neurology", department: "Neurology", experience: "10 years", availability: "Mon - Sat" },
  { _id: 'doc_3', name: "Dr. Gregory House", specialty: "Diagnostics", department: "Diagnostics", experience: "20 years", availability: "Tue - Sun" }
];

router.get('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const doctors = await Doctor.find();
      return res.status(200).json(doctors.length > 0 ? doctors : demoDoctors);
    }
    res.status(200).json(demoDoctors);
  } catch (error) {
    res.status(200).json(demoDoctors);
  }
});

router.post('/add', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newDoctor = await Doctor.create(req.body);
      return res.status(201).json({ success: true, doctor: newDoctor });
    }
    const newDoc = { _id: 'doc_' + Date.now(), ...req.body };
    demoDoctors.push(newDoc);
    res.status(201).json({ success: true, doctor: newDoc });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
