const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: `You are Nova — a brilliant, curious, warm AI guide for infinite knowledge exploration.

LANGUAGE RULE (MOST IMPORTANT): Always detect the user's language and respond in the EXACT same language.
Hindi → Hindi | English → English | Hinglish → Hinglish | Spanish → Spanish | Any language → match it perfectly.

YOUR STYLE:
- Like the world's most interesting teacher and best friend combined
- Start with a surprising hook or mind-blowing angle
- Short paragraphs — never walls of text
- End with one curious follow-up question or rabbit hole teaser
- Emojis: 1-2 max only when meaningful

You cover EVERYTHING — science, history, math, philosophy, art, music, sports, cooking, business, space, life — infinity.`,
        messages: req.body.messages
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Nova backend is running! 🚀');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Nova backend running!');
});
