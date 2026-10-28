import express from 'express';
import Appointment from '../models/MyAppointment.js';
import Prescription from '../models/Prescription.js';
import mongoose from 'mongoose';

const router = express.Router();

const demoAppointments = [
  { _id: "APT001", doctor: "Dr. Walter White", dept: "Cardiology", date: "2026-10-30", time: "10:30 AM", status: "Upcoming" },
  { _id: "APT002", doctor: "Dr. Sarah Smith", dept: "Neurology", date: "2026-09-15", time: "11:00 AM", status: "Completed" }
];

const demoPrescriptions = [
  { _id: "PRE001", doctor: "Dr. Walter White", date: "2026-09-15", medicines: [{ name: "Aspirin 75mg", dosage: "1 tab daily", duration: "30 days" }] }
];

// Patient appointments
router.get('/appointments/patient/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const appointments = await Appointment.find({ patientId: req.params.id });
      return res.json(appointments.length > 0 ? appointments : demoAppointments);
    }
    res.json(demoAppointments);
  } catch (err) {
    res.json(demoAppointments);
  }
});

// Patient prescriptions
router.get('/prescriptions/patient/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const prescriptions = await Prescription.find({ patientId: req.params.id });
      return res.json(prescriptions.length > 0 ? prescriptions : demoPrescriptions);
    }
    res.json(demoPrescriptions);
  } catch (err) {
    res.json(demoPrescriptions);
  }
});

// Patient bills
router.get('/bills/patient/:id', async (req, res) => {
  res.json([
    {
      id: "INV-20261001",
      date: "2026-09-15",
      doctor: "Dr. Sarah Smith",
      total: 1500,
      status: "Paid",
      breakdown: { consultation: 500, medicines: 1000, roomCharge: 0, otherCharges: 0, discount: 0 }
    }
  ]);
});

export default router;
