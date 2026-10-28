import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '30d' });
};

// In-memory fallback if MongoDB Atlas is not yet connected
const memoryUsers = [
  { _id: '1', name: 'Demo Patient', email: 'patient@medicio.com', password: 'password', role: 'patient' },
  { _id: '2', name: 'Demo Admin', email: 'admin@medicio.com', password: 'admin', role: 'admin' },
];

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'patient' } = req.body;

    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });

      const user = await User.create({ name, email, password, role });
      return res.status(201).json({
        message: 'Registration successful',
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id)
      });
    }

    // Fallback mode if MongoDB URI not configured
    const existing = memoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const newUser = { _id: 'mem_' + Date.now(), name, email, password, role };
    memoryUsers.push(newUser);

    return res.status(201).json({
      message: 'Registration successful (Demo Mode)',
      user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      token: generateToken(newUser._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(password))) {
        if (user.role !== role) {
          return res.status(401).json({ message: 'Invalid role for this account' });
        }
        return res.json({
          message: 'Login successful',
          user: { _id: user._id, name: user.name, email: user.email, role: user.role },
          token: generateToken(user._id)
        });
      }
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Fallback mode if MongoDB URI not configured
    const user = memoryUsers.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
    if (user && user.password === password) {
      if (role && user.role !== role) {
        return res.status(401).json({ message: `Role mismatch: this account is registered as ${user.role}` });
      }
      return res.json({
        message: 'Login successful (Demo Mode)',
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token: generateToken(user._id)
      });
    }

    // If no user found in demo list, allow login with any demo password for seamless testing
    if (password && email) {
      const fallbackUser = { _id: 'user_' + Date.now(), name: email.split('@')[0], email, role: role || 'patient' };
      memoryUsers.push({ ...fallbackUser, password });
      return res.json({
        message: 'Login successful',
        user: fallbackUser,
        token: generateToken(fallbackUser._id)
      });
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
