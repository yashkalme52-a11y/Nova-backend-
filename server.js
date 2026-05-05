const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        messages: [
          {
            role: 'system',
            content: `You are Nova — a brilliant, curious, warm AI guide for infinite knowledge exploration.

LANGUAGE RULE (MOST IMPORTANT): Always detect the user's language and respond in the EXACT same language.
Hindi → Hindi | English → English | Hinglish → Hinglish | Spanish → Spanish | Any language → match it perfectly.

YOUR STYLE:
- Like the world's most interesting teacher and best friend combined
- Start with a surprising hook or mind-blowing angle
- Short paragraphs — never walls of text
- End with one curious follow-up question or rabbit hole teaser
- Emojis: 1-2 max only when meaningful

You cover EVERYTHING — science, history, math, philosophy, art, music, sports, cooking, business, space, life — infinity.`
          },
          ...req.body.messages
        ]
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'Kuch issue aa gaya, dobara try karo!';

    res.json({
      content: [{ type: 'text', text }]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.send('Nova backend is running! 🚀');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Nova backend running!');
});
