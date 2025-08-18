const request = require('supertest')
const { app, server } = require('../app')
const mongoose = require('mongoose')
const User = require('../models/User')

describe('Auth API', () => {
  afterAll(async () => {
    await User.deleteMany() // Clean up test data
    await mongoose.disconnect()
    await server.close()
  })

  // Test for registration
  describe('POST /register', () => {
    const validName = 'Shubhham'
    const validEmail = 'test@example.com'
    const validPassword = 'password123'

    it('should return 400 if name is missing', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        email: validEmail,
        password: validPassword,
      })

      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toBe('Name, email, and password are required')
    })

    it('should return 400 if email is missing', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        name: validName,
        password: validPassword,
      })

      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toBe('Name, email, and password are required')
    })

    it('should return 400 if password is missing', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        name: validName,
        email: validEmail,
      })

      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toBe('Name, email, and password are required')
    })

    it('should return 400 if all fields are missing', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({}) // No fields provided

      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toBe('Name, email, and password are required')
    })

    it('should register a new user', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        name: validName,
        email: validEmail,
        password: validPassword,
      })

      expect(res.statusCode).toEqual(201)
      expect(res.body.message).toBe('User registered successfully')
    })

    it('should return 400 if email already exists', async () => {
      const res = await request(app).post('/api/v1/auth/register').send({
        name: validName,
        email: validEmail, // Duplicate email
        password: validPassword,
      })

      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toBe('Email already exists')
    })
  })

  // Test for login
  describe('POST /login', () => {
    it('should login user with valid credentials', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('token')
    })

    it('should return 400 if email is not found', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'wrongemail@example.com',
        password: 'password123',
      })

      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toBe('Invalid email or password')
    })

    it('should return 400 if password is incorrect', async () => {
      const res = await request(app).post('/api/v1/auth/login').send({
        email: 'test@example.com',
        password: 'wrongpassword',
      })

      expect(res.statusCode).toEqual(400)
      expect(res.body.message).toBe('Invalid email or password')
    })
  })
})
