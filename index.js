const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const client = new Client({
  authStrategy: new LocalAuth(), // session is saved
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  }
});

const toNumbers = [
  '918377884512@c.us',
  '919711720145@c.us',
  '918287154627@c.us'
];

client.on('qr', qr => {
  console.log('📲 Scan this QR code to login:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ WhatsApp bot is ready!');
  toNumbers.forEach(number => {
    client.sendMessage(number, '✅ The WhatsApp bot is now LIVE!');
  });
});

client.initialize();

// Express server (Render requires this)
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (_, res) => res.send('✅ WhatsApp bot is running'));
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
