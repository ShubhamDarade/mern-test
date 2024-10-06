require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'], // Load environment variables
    globals: {
        NODE_ENV: 'test'
    }
};
