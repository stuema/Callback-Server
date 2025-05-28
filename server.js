const express = require('express');
const app = express();
app.use(express.json());

app.post('/callback', (req, res) => {

   // 🔍 Read 'X-Transaction-Id'
  const transactionId = req.headers['x-transaction-id'] || 'MISSING';

   // 🕒 Read starting Date of operation (from request headers, not response)
  const StartingDate = req.headers['date'] || 'MISSING';
   

   
  console.log('✅ Callback received:');
   console.log('X-Transaction-Id:', transactionId);
   console.log('Starting Date:', StartingDate);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).send('Received');
});

app.get('/', (req, res) => {
  res.send('Callback server is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
