import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'medicio_supersecret_jwt_2026', { expiresIn: '30d' });
};

// ─── Demo users for fallback mode (when no MongoDB is connected) ─────────────
// These allow ANY device to login without a database
const demoUsers = [
  { _id: 'd1', name: 'Demo Patient', email: 'patient@medicio.com', password: 'password123', role: 'patient' },
  { _id: 'd2', name: 'Admin User', email: 'admin@medicio.com', password: 'admin123', role: 'admin' },
];

// In-memory user store (survives within one serverless instance lifecycle)
const memoryUsers = [...demoUsers];

// ─── REGISTER ────────────────────────────────────────────────────────────────
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'patient' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // MongoDB path
    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) return res.status(400).json({ message: 'An account with this email already exists.' });

      const user = await User.create({ name, email: email.toLowerCase(), password, role });
      return res.status(201).json({
        message: 'Registration successful!',
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id),
      });
    }

    // Fallback/demo path
    const existing = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) return res.status(400).json({ message: 'An account with this email already exists.' });

    const newUser = { _id: 'mem_' + Date.now(), name, email: email.toLowerCase(), password, role };
    memoryUsers.push(newUser);

    return res.status(201).json({
      message: 'Registration successful!',
      user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// ─── LOGIN ───────────────────────────────────────────────────────────────────
export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // MongoDB path
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ message: 'No account found with this email.' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password.' });
      }

      if (role && user.role !== role) {
        return res.status(401).json({ message: `This account is registered as "${user.role}", not "${role}".` });
      }

      return res.json({
        message: 'Login successful',
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id),
      });
    }

    // Fallback/demo path
    const user = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ message: 'No account found with this email. Please register first.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password.' });
    }

    if (role && user.role !== role) {
      return res.status(401).json({ message: `This account is registered as "${user.role}", not "${role}".` });
    }

    return res.json({
      message: 'Login successful',
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error during login.' });
  }
};
