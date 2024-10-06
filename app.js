require('dotenv').config({ path: '.env.test' });
const express = require('express');
const db = require('./database/db');
const authRoutes = require('./routes/authRoutes');

// Connect to MongoDB
db.connectDB()

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Auth Routes
app.use('/api/v1/auth', authRoutes);

// Port
const PORT = process.env.PORT;

// Listen
const server = app.listen(PORT, () => {
    console.log(`Server Running on port no ${PORT}`);
});

// Export the app and server for testing
module.exports = { app, server };