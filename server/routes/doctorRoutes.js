import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Badha doctors ne bolavva (Patient form ane Admin schedule mate)
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Navo doctor add karva (Admin mate)
router.post('/add', async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;