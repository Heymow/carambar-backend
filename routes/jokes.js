const express = require('express');
const { sequelize, Joke } = require('../models');
const router = express.Router();

// ajouter une blague
router.post('/', async (req, res) => {
    try {
        const { content } = req.body;
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Le contenu est manquant ou vide' });
        }
        const joke = await Joke.create({ content: req.body.content });
        res.status(201).json(joke);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// consulter toutes les blagues
router.get('/', async (req, res) => {
    try {
        const jokes = await Joke.findAll();
        res.status(200).json(jokes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// consulter une blague aléatoire
router.get('/random', async (req, res) => {
    try {
        const joke = await Joke.findOne({ order: sequelize.random() });
        res.json(joke);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// consulter une blague par son id
router.get('/:id', async (req, res) => {
    try {
        const joke = await Joke.findByPk(req.params.id);
        if (!joke) return res.status(404).json({ error: 'Blague non trouvée' });
        res.json(joke);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
