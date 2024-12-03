const { sequelize, Joke } = require('../models');


// ajouter une blague
exports.addJoke = async (req, res) => {
    try {
        // contrôle de la validité du contenu
        const { content } = req.body;
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Le contenu est manquant ou vide' });
        }
        if (content.length > 255) {
            return res.status(400).json({ error: 'La blague ne peut pas dépasser 255 caractères.' });
        }
        // création de la blague
        const joke = await Joke.create({ content: req.body.content });
        res.status(201).json(joke);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// consulter toutes les blagues
exports.getAllJokes = async (req, res) => {
    try {
        const jokes = await Joke.findAll();
        res.status(200).json(jokes);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// consulter une blague aléatoire
exports.getRandomJoke = async (req, res) => {
    try {
        const joke = await Joke.findOne({ order: sequelize.random() });
        res.json(joke);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// consulter une blague par son id
exports.getJokeById = async (req, res) => {
    try {
        const joke = await Joke.findByPk(req.params.id);
        if (!joke) return res.status(404).json({ error: 'Blague non trouvée' });
        res.json(joke);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
