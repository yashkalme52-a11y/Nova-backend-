const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve Nova frontend
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nova — Infinite Knowledge</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f8f8f6; --surface: #ffffff; --border: #e8e8e6;
    --text: #1a1a1a; --muted: #888; --accent: #6366f1; --accent2: #a855f7;
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; display: flex; flex-direction: column; }
  header { padding: 14px 20px; background: var(--bg); border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; position: sticky; top: 0; z-index: 50; }
  .logo-box { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 2px 8px rgba(99,102,241,0.3); }
  .logo-name { font-weight: 700; font-size: 17px; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .logo-sub { font-size: 11px; color: var(--muted); }
  .header-btn { margin-left: auto; background: var(--text); color: white; border: none; border-radius: 10px; padding: 9px 18px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; }
  .back-btn { margin-left: auto; background: none; color: var(--muted); border: 1px solid var(--border); border-radius: 10px; padding: 8px 16px; font-size: 13px; cursor: pointer; font-family: inherit; }
  #home { flex: 1; display: flex; flex-direction: column; align-items: center; padding: 48px 20px 40px; max-width: 600px; margin: 0 auto; width: 100%; }
  .hero-icon { width: 72px; height: 72px; border-radius: 20px; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; font-size: 36px; margin-bottom: 24px; box-shadow: 0 8px 24px rgba(99,102,241,0.3); }
  h1 { font-family: 'Instrument Serif', serif; font-size: clamp(32px, 8vw, 52px); line-height: 1.1; text-align: center; margin-bottom: 14px; }
  h1 em { font-style: italic; background: linear-gradient(135deg, var(--accent), var(--accent2)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-sub { font-size: 15px; color: var(--muted); text-align: center; line-height: 1.7; margin-bottom: 32px; max-width: 400px; }
  .try-btn { width: 100%; max-width: 400px; padding: 16px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; border-radius: 14px; color: white; font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit; margin-bottom: 12px; box-shadow: 0 4px 16px rgba(99,102,241,0.3); }
  .waitlist-btn { width: 100%; max-width: 400px; padding: 14px; background: white; color: var(--text); border: 1px solid var(--border); border-radius: 14px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; margin-bottom: 32px; }
  .topics-label { font-size: 11px; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; margin-bottom: 14px; align-self: flex-start; max-width: 400px; width: 100%; }
  .topics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; max-width: 400px; }
  .topic-card { background: white; border: 1px solid var(--border); border-radius: 12px; padding: 14px; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text); transition: all 0.2s; }
  .topic-card:hover { border-color: var(--accent); transform: translateY(-1px); }
  .topic-card span:first-child { font-size: 20px; }
  #chat { display: none; width: 100%; height: 100%; }
  #messages { flex: 1; overflow-y: auto; padding: 20px 16px; display: flex; flex-direction: column; gap: 18px; max-width: 720px; width: 100%; margin: 0 auto; }
  .msg { display: flex; gap: 10px; animation: slideUp 0.3s ease; }
  .msg.user { flex-direction: row-reverse; }
  .msg-avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; margin-top: 2px; }
  .msg-avatar.nova { background: linear-gradient(135deg, var(--accent), var(--accent2)); border-radius: 10px; }
  .msg-avatar.user { background: #e8e8e6; color: #666; font-size: 13px; font-weight: 700; }
  .msg-bubble { max-width: 78%; padding: 12px 16px; font-size: 14.5px; line-height: 1.8; white-space: pre-wrap; }
  .msg-bubble.nova { background: white; border: 1px solid var(--border); border-radius: 4px 16px 16px 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
  .msg-bubble.user { background: var(--text); color: white; border-radius: 16px 4px 16px 16px; }
  .typing { display: flex; gap: 5px; align-items: center; padding: 14px 18px; }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); animation: blink 1.2s infinite; }
  .dot:nth-child(2) { animation-delay: 0.15s; }
  .dot:nth-child(3) { animation-delay: 0.3s; }
  #input-area { padding: 12px 16px 20px; background: var(--bg); border-top: 1px solid var(--border); }
  .input-wrap { max-width: 720px; margin: 0 auto; display: flex; gap: 10px; align-items: center; background: white; border: 1px solid #e0e0de; border-radius: 16px; padding: 8px 8px 8px 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.06); }
  #msg-input { flex: 1; border: none; background: transparent; font-size: 14px; color: var(--text); font-family: inherit; outline: none; }
  #msg-input::placeholder { color: #aaa; }
  #send-btn { width: 38px; height: 38px; border-radius: 12px; border: none; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: white; font-size: 17px; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  #send-btn:disabled { background: #f3f4f6; color: #aaa; cursor: default; }
  .input-note { text-align: center; font-size: 11px; color: #ccc; margin-top: 8px; }
  @keyframes slideUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes blink { 0%,100%{opacity:0.25} 50%{opacity:1} }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #e0e0de; border-radius: 10px; }
</style>
</head>
<body>
<header id="header">
  <div class="logo-box">⭐</div>
  <div><div class="logo-name">Nova</div><div class="logo-sub">Infinite Knowledge · Any Language</div></div>
  <button class="header-btn" onclick="window.open('https://tally.so/r/7R4D4L','_blank')">Join Waitlist</button>
</header>
<div id="home">
  <div class="hero-icon">⭐</div>
  <h1>Explore<br><em>Infinite</em><br>Knowledge</h1>
  <p class="hero-sub">Kuch bhi pucho — science, history, universe, life. Kisi bhi language mein. Infinity tak.</p>
  <button class="try-btn" id="tryBtn">✨ Nova se baat karo</button>
  <button class="waitlist-btn" id="waitlistBtn">🚀 Early Access Join Karo</button>
  <div class="topics-label">Ya yahan se shuru karo</div>
  <div class="topics-grid">
    <div class="topic-card" data-topic='Universe kya hai?'><span>🌌</span><span>Universe kya hai?</span></div>
    <div class="topic-card" data-topic='Black hole kaise banta hai?'><span>⚫</span><span>Black hole kya hai?</span></div>
    <div class="topic-card" data-topic='Music hume emotional kyun karta hai?'><span>🎵</span><span>Music emotional kyun?</span></div>
    <div class="topic-card" data-topic='Time travel possible hai?'><span>⏳</span><span>Time travel possible?</span></div>
    <div class="topic-card" data-topic='Paise kaise kaam karte hain?'><span>💰</span><span>Paise kaise kaam karte?</span></div>
    <div class="topic-card" data-topic='Dimag kaise kaam karta hai?'><span>🧠</span><span>Dimag kaise kaam karta?</span></div>
    <div class="topic-card" data-topic='Earth kab bani?'><span>🌍</span><span>Earth kab bani?</span></div>
    <div class="topic-card" data-topic='AI kya hai?'><span>🤖</span><span>AI kya hai?</span></div>
  </div>
</div>
<div id="chat">
  <div id="messages"></div>
  <div id="input-area">
    <div class="input-wrap">
      <input id="msg-input" placeholder="Kuch bhi pucho — हिंदी, English, Español, Français..." onkeydown="if(event.key==='Enter') sendMsg()" />
      <button id="send-btn" onclick="sendMsg()">↑</button>
    </div>
    <p class="input-note">Nova can make mistakes. Verify important information.</p>
  </div>
</div>
<script>
  let history = [];
  let isLoading = false;

  function startChat() { showChat(); }
  function startWithTopic(topic) { showChat(); setTimeout(() => sendMsg(topic), 100); }

  function showChat() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    document.querySelector('.header-btn') && (document.querySelector('.header-btn').outerHTML = '<button class="back-btn" onclick="goHome()">← Back</button>');
    document.getElementById('msg-input').focus();
  }

  function goHome() {
    document.getElementById('home').style.display = 'flex';
    document.getElementById('chat').style.display = 'none';
    document.querySelector('.back-btn') && (document.querySelector('.back-btn').outerHTML = '<button class="header-btn" onclick="window.open(\'https://tally.so/r/7R4D4L\',\'_blank\')">Join Waitlist</button>');
    document.getElementById('messages').innerHTML = '';
    history = [];
  }

  function addMsg(role, text) {
    const msgs = document.getElementById('messages');
    const div = document.createElement('div');
    div.className = 'msg ' + role;
    div.innerHTML = '<div class="msg-avatar ' + role + '">' + (role === 'nova' ? '⭐' : 'Y') + '</div><div class="msg-bubble ' + role + '">' + text + '</div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const msgs = document.getElementById('messages');
    const div = document.createElement('div');
    div.className = 'msg nova'; div.id = 'typing';
    div.innerHTML = '<div class="msg-avatar nova">⭐</div><div class="msg-bubble nova"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function removeTyping() { const t = document.getElementById('typing'); if (t) t.remove(); }

  // Add event listeners
  document.getElementById('tryBtn').addEventListener('click', function() { startChat(); });
  document.getElementById('waitlistBtn').addEventListener('click', function() { window.open('https://tally.so/r/7R4D4L','_blank'); });
  document.querySelectorAll('[data-topic]').forEach(function(el) {
    el.addEventListener('click', function() { startWithTopic(this.getAttribute('data-topic')); });
  });

  async function sendMsg(text) {
    const input = document.getElementById('msg-input');
    const btn = document.getElementById('send-btn');
    const msg = (text || input.value).trim();
    if (!msg || isLoading) return;
    input.value = ''; isLoading = true; btn.disabled = true;
    addMsg('user', msg);
    history.push({ role: 'user', content: msg });
    showTyping();
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Kuch issue aa gaya!';
      removeTyping();
      addMsg('nova', reply);
      history.push({ role: 'assistant', content: reply });
    } catch(e) {
      removeTyping();
      addMsg('nova', 'Network issue. Dobara try karo!');
    }
    isLoading = false; btn.disabled = false; input.focus();
  }
</script>
</body>
</html>`);
});

// Chat API
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

LANGUAGE RULE: Always detect the user's language and respond in the EXACT same language.
Hindi → Hindi | English → English | Hinglish → Hinglish | Any language → match it perfectly.

YOUR STYLE:
- Like the world's most interesting teacher and best friend combined
- Start with a surprising hook or mind-blowing angle
- Short paragraphs — never walls of text
- End with one curious follow-up question
- Emojis: 1-2 max only

You cover EVERYTHING — science, history, math, philosophy, art, music, sports, cooking, business, space, life — infinity.`
          },
          ...req.body.messages
        ]
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'Kuch issue aa gaya!';
    res.json({ content: [{ type: 'text', text }] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Nova backend running!');
});
