// Simple Node.js Express proxy for Gemini AI Studio API (CommonJS)
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCxeNpjmfs5tQtARtSz9JGKKj2KX4PEtFE';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });
    const data = await response.json();
    res.json({
      reply: data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that."
    });
  } catch (err) {
    res.status(500).json({ reply: 'Error contacting Gemini API.' });
  }
});

const PORT = process.env.PORT || 5134;
app.listen(PORT, () => {
  console.log(`Gemini chatbot proxy running on port ${PORT}`);
});
