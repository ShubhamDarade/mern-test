const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

//     Developers will need to create their own .env and .env.test: Since .env and .env.test files are ignored by Git, developers will need to create these files manually by copying the contents of .env.sample and .env.test.sample. The sample files will help them know what environment variables they need to define.
// Typically, developers do this by running:
//     cp .env.sample .env
//     cp .env.test.sample .env.test

/**
 * Registers a new user.
 *
 * This function handles the user registration process by receiving name, email,
 * and password from the request body. It checks if the email is already registered,
 * hashes the password, and saves the new user to the database. If registration
 * is successful, it returns a success message. Otherwise, it returns an error
 * message with the appropriate HTTP status code.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing user registration data.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 *
 * @returns {Promise<void>} Sends a JSON response indicating success or failure of the registration.
 *
 * @throws {Error} Will return a 500 status code and error message if there's a server-side issue.
 */

// User registration controller
exports.register = async (req, res) => {
  const { name, email, password } = req.body

  // Check if all required fields are provided
  if (!name || !email || !password) {
    logger.warn('Registration failed - Missing required fields')
    return res
      .status(400)
      .json({ message: 'Name, email, and password are required' })
  }

  try {
    logger.info(`Registration attempt - Email: ${email}`)

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      logger.warn(`Registration failed - Email already exists: ${email}`)
      return res.status(400).json({ message: 'Email already exists' })
    }

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create a new user instance and save to the database
    const user = new User({ name, email, password: hashedPassword })
    await user.save()

    logger.info(`User registered successfully - Email: ${email}`)

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    // Log the error and return a server error response
    logger.error(`Registration error - Email: ${email}, Error: ${err.message}`)
    res.status(500).json({ message: 'Server error' })
  }
}

// User login controller
exports.login = async (req, res) => {
  const { email, password } = req.body

  // Check for missing required fields
  if (!email || !password) {
    logger.warn('Login failed - Missing required fields')
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    logger.info(`Login attempt - Email: ${email}`)

    // Find the user by email
    const user = await User.findOne({ email })
    if (!user) {
      logger.warn(`Login failed - Email not found: ${email}`)
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      logger.warn(`Login failed - Incorrect password for Email: ${email}`)
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Generate a JSON Web Token for the authenticated user
    const token = jwt.sign({ userId: user._id }, 'secretkey', {
      expiresIn: '1h',
    })

    logger.info(`Login successful - Email: ${email}`)

    // Respond with the generated token
    res.status(200).json({ token })
  } catch (err) {
    // Log the error and return a server error response
    logger.error(`Login error - Email: ${email}, Error: ${err.message}`)
    res.status(500).json({ message: 'Server error' })
  }
}
