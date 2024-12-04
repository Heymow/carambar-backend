const express = require('express');
require('dotenv').config();
const jokeRouter = require('./routes/jokes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./init/swaggerConfig');
const initializeDatabase = require('./init/dbInit');
console.log(typeof initializeDatabase);

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

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