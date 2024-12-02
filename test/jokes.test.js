const request = require('supertest');
const app = require('../index');
const { sequelize, Joke } = require('../models');

describe('API Carambar', () => {

    // Données de test

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        await Joke.bulkCreate([
            { content: "Quelle est la femelle du hamster ? L’Amsterdam" },
            { content: "Que dit un oignon quand il se cogne ? Aïe" },
            { content: "Quel est l'animal le plus heureux ? Le hibou, parce que sa femme est chouette." },
            { content: "Pourquoi le football c'est rigolo ? Parce que Thierry en rit" },
            { content: "Quel est le sport le plus fruité ? La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes." },
            { content: "Que se fait un Schtroumpf quand il tombe ? Un Bleu" },
            { content: "Quel est le comble pour un marin ? Avoir le nez qui coule" },
            { content: "Qu'est ce que les enfants usent le plus à l'école ? Le professeur" },
            { content: "Quel est le sport le plus silencieux ? Le para-chuuuut" },
            { content: "Quel est le comble pour un joueur de bowling ? C’est de perdre la boule" },
        ]);
    });
    afterAll(async () => {
        await sequelize.close();
    });


    // Tests

    test('POST /jokes/ devrait ajouter une nouvelle blague', async () => {
        const joke = { content: 'Pourquoi le football c\'est rigolo ? Parce que Thierry en rit.' };
        const res = await request(app).post('/jokes').send(joke);
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(joke);
    });

    test('POST /jokes/ devrait retourner une erreur si le contenu est vide', async () => {
        const joke = { content: '' };
        const res = await request(app).post('/jokes').send(joke);
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('POST /jokes/ devrait retourner une erreur si le contenu est manquant', async () => {
        const res = await request(app).post('/jokes').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });

    test('GET /jokes/ devrait récupérer toutes les blagues', async () => {
        const res = await request(app).get('/jokes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(9);
        expect(res.body[0]).toHaveProperty('content', "Quelle est la femelle du hamster ? L’Amsterdam");
    });

    test('GET /jokes/:id devrait retourner une blague spécifique', async () => {
        const res = await request(app).get('/jokes/5');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('content', "Quel est le sport le plus fruité ? La boxe, parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.");
    });

    test('GET /jokes/:id devrait retourner une erreur si la blague n existe pas', async () => {
        const res = await request(app).get('/jokes/9999');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('error', 'Blague non trouvée');
    });

    test('GET /jokes/random devrait retourner une blague aléatoire', async () => {
        const res = await request(app).get('/jokes/random');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('content');
    });
});