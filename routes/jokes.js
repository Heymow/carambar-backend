const express = require('express');
const router = express.Router();
const jokeController = require('../controllers/jokeController');

// ajouter une blague
/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Ajouter une nouvelle blague
 *     tags:
 *       - Blagues
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blague créée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 content:
 *                   type: string
 */
router.post('/', jokeController.addJoke);


// consulter toutes les blagues
/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Consulter toutes les blagues
 *     tags:
 *       - Blagues
 *     responses:
 *       200:
 *         description: Liste de toutes les blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
 *                     type: string
 */
router.get('/', jokeController.getAllJokes);


// consulter une blague aléatoire
/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Consulter une blague aléatoire
 *     tags:
 *       - Blagues
 *     responses:
 *       200:
 *         description: Blague aléatoire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 content:
 *                   type: string
 */
router.get('/random', jokeController.getRandomJoke);


// consulter une blague par son id
/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Consulter une blague par ID
 *     tags:
 *       - Blagues
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la blague
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blague trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 content:
 *                   type: string
 *       404:
 *         description: Blague non trouvée
 */
router.get('/:id', jokeController.getJokeById);

module.exports = router;
