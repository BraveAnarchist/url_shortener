const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());


const urlDatabase = {};


const generateShortUrl = () => {
  return crypto.randomBytes(4).toString('hex');
};


app.post('/shorten', (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  const shortUrlKey = generateShortUrl();
  urlDatabase[shortUrlKey] = longUrl;

  res.json({ shortUrl: `http://localhost:3000/${shortUrlKey}` });
});


app.get('/:shortUrl', (req, res) => {
  const shortUrlKey = req.params.shortUrl;
  const longUrl = urlDatabase[shortUrlKey];

  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).json({ error: 'URL not found' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
