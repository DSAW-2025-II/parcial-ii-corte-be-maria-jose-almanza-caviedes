const express = require('express');
const axios = require('axios');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/pokemonDetails', authenticateToken, async (req, res) => {
  const { pokemonName } = req.body || {};
  if (!pokemonName) {
    return res.status(400).json({ name: '', species: '', weight: '', img_url: '' });
  }

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemonName.toLowerCase())}`;
    const response = await axios.get(url);
    const data = response.data;
    const result = {
      name: data.name || '',
      species: data.species?.name || '',
      weight: data.weight ? String(data.weight) : '',
      img_url: data.sprites?.front_default || ''
    };
    return res.status(200).json(result);
  } catch (err) {
    // If pokeapi returns 404 or other error, return empty fields with 400
    return res.status(400).json({ name: '', species: '', weight: '', img_url: '' });
  }
});

module.exports = router;
