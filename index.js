const express = require('express');
require('dotenv').config();
const jokeRouter = require('./routes/jokes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./init/swaggerConfig');
const initializeDatabase = require('./init/dbInit');
const cors = require('cors');

const app = express();

app.use(cors());
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
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Serveur en écoute sur le port ${PORT}`);
    });
}


module.exports = app;