const swaggerJSDoc = require('swagger-jsdoc');
let site_URL = 'localhost';

switch (process.env.NODE_ENV) {
    case 'development':
        site_URL = process.env.SITE_URL_DEV;
        break;
    case 'test':
        site_URL = process.env.SITE_URL_TEST;
        break;
    default:
        site_URL = process.env.SITE_URL_PROD;
        break;
}

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Blagues Carambar',
            version: '1.0.0',
            description: 'Une API pour gérer et afficher des blagues Carambar.',
        },
        servers: [{ url: site_URL }],
    },
    apis: ['./routes/jokes.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;