require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const data = require('./sampleData')
const db = require('../database/db')

async function hashPasswords(users) {
  return Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 12)
      return { ...user, password: hashedPassword }
    })
  )
}

async function seedData() {
  try {
    db.connectDB()

    // Hash passwords before seeding users
    const usersWithHashedPasswords = await hashPasswords(data.users)

    // Seed users collection
    await User.insertMany(usersWithHashedPasswords)
    console.log('Users seeded successfully')
  } catch (err) {
    console.error('Error seeding data:', err)
  } finally {
    await mongoose.connection.close() // Close the connection
  }
}

seedData()
