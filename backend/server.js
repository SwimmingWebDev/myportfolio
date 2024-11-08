const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../frontend/views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/views/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
