import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import express from 'express';

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "main-session",
    dataPath: "./session"
  }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  }
});

client.on('qr', qr => {
  console.log("🔄 QR Code received, scan with your WhatsApp:");
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ WhatsApp is ready!');
  const numbers = ['+911234567890', '+919876543210', '+911112223334']; // Replace with your numbers
  numbers.forEach(number => {
    client.sendMessage(number + '@c.us', '✅ The bot is now online!');
  });
});

client.initialize();

const app = express();
app.get('/', (req, res) => {
  res.send('🚀 WhatsApp API running on port 7860');
});
app.listen(7860, () => console.log("🚀 WhatsApp API running on port 7860"));