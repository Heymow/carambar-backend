require('dotenv').config();
const { sequelize } = require('../models');
const seedFile = require('../seeders/20241202215604-default-jokes');

const initializeDatabase = async () => {
    try {
        if (process.env.NODE_ENV === 'production') {
            console.log('Database building...');
            await sequelize.sync();

            const queryInterface = sequelize.getQueryInterface();

            console.log('Seeding database...');
            await seedFile.up(queryInterface, sequelize);
            console.log('Database init complete');
        }
    } catch (error) {
        console.error('Database init error :', error);
    }
};

module.exports = initializeDatabase;