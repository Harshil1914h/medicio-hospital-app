import express from 'express';
import Medicine from '../models/Medicine.js';

const router = express.Router();

// Dawa sell (dispense) karva mate ni API
router.put('/dispense/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    
    if (medicine && medicine.stock > 0) {
      medicine.stock -= 1; // 1 dawa aapi didhi etle stock 1 occho karyo
      await medicine.save();
      res.status(200).json({ success: true, message: "1 Unit sold", medicine });
    } else {
      res.status(400).json({ success: false, message: "Out of stock!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;