import express from 'express';
import Appointment from '../models/MyAppointment.js'; // જો તમારી પાસે અપોઇન્ટમેન્ટનું મોડેલ હોય તો
import Prescription from '../models/Prescription.js';
import Bill from '../models/Bill.js'; // જો બિલનું મોડેલ હોય તો, નહીંતર નીચે મુજબ

const router = express.Router();

// ૧. પેશન્ટની અપોઇન્ટમેન્ટ મેળવવા માટેની API
router.get('/appointments/patient/:id', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.id });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ૨. પેશન્ટના પ્રિસ્ક્રિપ્શન્સ મેળવવા માટેની API
router.get('/prescriptions/patient/:id', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.params.id });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ૩. પેશન્ટના બિલ્સ મેળવવા માટેની API
router.get('/bills/patient/:id', async (req, res) => {
  try {
    // જો તમે ડેટાબેઝમાં બિલ સેવ કરતા હોવ તો Bill.find વાપરો
    // અત્યારે આપણે ટેસ્ટિંગ માટે ડમી અથવા મોડેલમાંથી ફેચ કરી શકીએ
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;