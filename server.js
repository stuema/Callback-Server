const express = require('express');
const { DateTime } = require('luxon');

const app = express();
app.use(express.json());

// POST /callback — secure and logs local Italy time
app.post('/callback', (req, res) => {
  const receivedKey = req.headers['x-api-key'];
  const expectedKey = process.env.CALLBACK_API_KEY;

  if (receivedKey !== expectedKey) {
    return res.status(403).send('Forbidden: Invalid API Key');
  }

  // Get current UTC timestamp
  const timestampUTC = new Date().toISOString();

  // Convert to Italy local time
  const italyTime = DateTime.fromISO(timestampUTC)
    .setZone('Europe/Rome')
    .toFormat('yyyy-MM-dd HH:mm:ss');

  // Log results
  console.log('✅ Callback received:');
  console.log('🕒 UTC Time:', timestampUTC);
  console.log('🇮🇹 Italy Time:', italyTime);
  console.log('📦 Payload:', JSON.stringify(req.body, null, 2));

  res.status(200).send('Callback received successfully');
});

// GET / — health check route
app.get('/', (req, res) => {
  res.send('✅ Callback server is running!');
});

// Listen on the correct port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
