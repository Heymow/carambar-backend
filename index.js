const express = require('express');
require('dotenv').config();
const jokeRouter = require('./routes/jokes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swaggerConfig');

const app = express();
app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/jokes', jokeRouter);
app.get('/', (req, res) => {
    res.send('API Online');
});

(async () => {
    await initializeDatabase();
})();


if (require.main === module) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur en écoute sur le port ${PORT}`);
    });
}


module.exports = app;