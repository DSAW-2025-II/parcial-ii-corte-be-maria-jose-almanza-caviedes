const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const pokemonRoutes = require('./routes/pokemon');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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
