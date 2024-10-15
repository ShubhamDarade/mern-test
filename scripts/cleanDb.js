require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')
const db = require('../database/db')

async function cleanDb() {
  try {
    db.connectDB()

    // Seed users collection
    await User.deleteMany({})
    console.log(`Users collection cleaned`)
  } catch (err) {
    console.error(`Error cleaning database: ${err}`)
  } finally {
    await mongoose.connection.close() // Close the connection
  }
}

cleanDb()
