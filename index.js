const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const bodyParser = require('body-parser');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

const app = express();
app.use(bodyParser.json());

const toNumbers = [
  '918377884512@c.us',
  '919711720145@c.us',
  '918287154627@c.us'
];

// QR display
client.on('qr', qr => {
  console.log('📲 Scan this QR code to login:');
  qrcode.generate(qr, { small: true });
});

// Ready
client.on('ready', () => {
  console.log('✅ WhatsApp bot is ready!');
  toNumbers.forEach(number => {
    client.sendMessage(number, '✅ The WhatsApp bot is now LIVE!');
  });
});

// Public API: POST /send-message
app.post('/send-message', async (req, res) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).send({ error: 'Missing number or message' });
  }

  try {
    await client.sendMessage(number, message);
    console.log(`✅ Sent to ${number}`);
    res.send({ status: 'success' });
  } catch (err) {
    console.error(`❌ Failed to send: ${err.message}`);
    res.status(500).send({ error: err.message });
  }
});

// Health check
app.get('/', (_, res) => res.send('✅ WhatsApp API is running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));

client.initialize();
