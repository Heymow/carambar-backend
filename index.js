const express = require('express');
require('dotenv').config();
const jokeRouter = require('./routes/jokes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Blagues Carambar',
            version: '1.0.0',
            description: 'Une API pour gérer et afficher des blagues Carambar.'
        },
        servers: [{ url: process.env.SITE_URL_PROD }]
    },
    apis: ['./routes/jokes.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/jokes', jokeRouter);

module.exports = app;

if (require.main === module) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur en écoute sur le port ${PORT}`);
    });
}