const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const pokemonRoutes = require('./routes/pokemon');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Friendly root route so the app doesn't return "Cannot GET /"
app.get('/', (req, res) => {
  const base = req.protocol + '://' + req.get('host');
  const html = `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Parcial BE - API</title>
      <style>
        body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial; padding: 2rem; }
        a { color: #0366d6; }
        .card { margin: .5rem 0; padding: .75rem; border: 1px solid #e1e4e8; border-radius: 6px; }
      </style>
    </head>
    <body>
      <h1>Parcial BE - API</h1>
      <p>This server exposes a small API used in the exam.</p>
      <div class="card">
        <strong>Auth (login)</strong>
        <div>POST <a href="${base}/api/v1/auth">/api/v1/auth</a></div>
        <div>Body: { "email": "admin@admin.com", "password": "admin" }</div>
      </div>
      <div class="card">
        <strong>Pokemon details</strong>
        <div>POST <a href="${base}/api/v1/pokemonDetails">/api/v1/pokemonDetails</a></div>
        <div>Headers: Authorization: Bearer &lt;token&gt;</div>
        <div>Body: { "pokemonName": "pikachu" }</div>
      </div>
      <hr />
      <small>Node env: ${process.env.NODE_ENV || 'development'} • PORT: ${process.env.PORT || 3000}</small>
    </body>
    </html>
  `;

  res.status(200).type('html').send(html);
});

app.use('/api/v1', authRoutes);
app.use('/api/v1', pokemonRoutes);

const PORT = process.env.PORT || 3000;

// Export app for serverless wrapper / tests
module.exports = app;

// If this file is executed directly (npm start / local dev), start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
