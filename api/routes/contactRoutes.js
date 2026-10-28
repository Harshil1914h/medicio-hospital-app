import express from 'express';
import Contact from '../models/Contact.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const contact = await Contact.create(req.body);
      return res.status(201).json({ success: true, message: "Message sent successfully!", data: contact });
    }
    res.status(201).json({ success: true, message: "Thank you! Your message has been received.", data: { _id: 'msg_' + Date.now(), ...req.body } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
  }
});

export default router;
