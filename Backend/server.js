const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const admissionRoutes = require('./Routes/admissionRoutes');
const applicantRoutes = require('./Routes/applicantRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connectDb = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set in Backend/.env');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};

app.get('/api/health', (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'error',
    database: connected ? 'connected' : 'disconnected',
    message: 'CSS UKPO backend is running',
  });
});

app.use('/api/admissions', admissionRoutes);
app.use('/api/applicants', applicantRoutes);

app.use((error, _req, res, next) => {
  console.error('API request failed:', error);
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({ message: 'Internal server error' });
});

const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
};

app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'manlikechicoc300@gmail.com' && password === '123456') {
    return res.json({ success: true, message: 'Login successful' });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

startServer().catch((error) => {
  console.error('Failed to start backend:', error);
  process.exitCode = 1;
});
