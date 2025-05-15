const express = require('express');
const app = express();
app.use(express.json());

app.post('/callback', (req, res) => {
  console.log('✅ Callback received:');
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
