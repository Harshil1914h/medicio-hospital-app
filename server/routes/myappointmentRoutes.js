import express from 'express';
import Appointment from '../models/MyAppointment.js';

const router = express.Router();

// એપોઇન્ટમેન્ટ બુક કરવાનો રસ્તો
router.post('/book', async (req, res) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, message: "Appointment booked successfully!", data: newAppointment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

// દર્દીની પોતાની એપોઇન્ટમેન્ટ જોવા માટેનો રસ્તો
router.get('/my-appointments/:email', async (req, res) => {
  try {
    const appointments = await Appointment.find({ email: req.params.email });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Cancel an appointment
router.delete('/cancel/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;