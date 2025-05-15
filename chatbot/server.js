require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    console.log('Received message:', message);
    
    console.log('Calling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    console.log('OpenAI API response received');

    const reply = completion.choices[0].message.content;
    console.log('Sending reply:', reply);

    res.json({ reply });
  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('API Key length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 'No API key found');
}); 