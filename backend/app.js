// === /server/app.js ===
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 7070;
const SPECIAL_KEY = process.env.SPECIAL_KEY;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🎉 Birthday Gift Server is Running!');
});

app.post('/api/auth/keyword-check', (req, res) => {
  const { keyword } = req.body;
  console.log('Received keyword:', keyword);
  if (!keyword) {
    return res.status(400).json({ success: false, message: 'Keyword is required' });
  }
  if (keyword === SPECIAL_KEY) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Invalid keyword' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
