import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// 1. Appointment Save karva mate (POST)
router.post('/book', async (req, res) => {
  try {
    const newApt = new Appointment(req.body);
    const savedApt = await newApt.save();
    res.status(201).json(savedApt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Patient ni appointments fetch karva mate (GET)
router.get('/patient/:id', async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Tame patient id mujab filter pan kari sako cho
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;