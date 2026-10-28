import express from 'express';
import Appointment from '../models/MyAppointment.js';
import mongoose from 'mongoose';

const router = express.Router();

const memoryAppointments = [
  { _id: 'apt_1', patientName: 'John Doe', email: 'patient@medicio.com', phone: '1234567890', date: '2026-11-01', department: 'Cardiology', doctor: 'Dr. Walter White', message: 'Regular checkup' }
];

// Book appointment
router.post('/book', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newAppointment = await Appointment.create(req.body);
      return res.status(201).json({ success: true, message: "Appointment booked successfully!", data: newAppointment });
    }

    const newApt = { _id: 'apt_' + Date.now(), ...req.body };
    memoryAppointments.push(newApt);
    res.status(201).json({ success: true, message: "Appointment booked successfully! (Demo Mode)", data: newApt });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// Get patient's appointments
router.get('/my-appointments/:email', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const appointments = await Appointment.find({ email: req.params.email });
      return res.status(200).json(appointments);
    }

    const filtered = memoryAppointments.filter(a => (a.email || '').toLowerCase() === req.params.email.toLowerCase());
    res.status(200).json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Cancel an appointment
router.delete('/cancel/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
      if (!deletedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      return res.status(200).json({ message: "Appointment cancelled successfully" });
    }

    const idx = memoryAppointments.findIndex(a => a._id === req.params.id);
    if (idx !== -1) {
      memoryAppointments.splice(idx, 1);
      return res.status(200).json({ message: "Appointment cancelled successfully" });
    }
    res.status(404).json({ message: "Appointment not found" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
