const express = require('express');
const jokeRouter = require('./routes/jokes');

const app = express();
app.use(express.json());

app.use('/jokes', jokeRouter);

module.exports = app;

if (require.main === module) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur en écoute sur le port ${PORT}`);
    });
}