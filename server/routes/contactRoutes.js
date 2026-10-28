import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: "Message sent successfully!", data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
  }
});

export default router;
