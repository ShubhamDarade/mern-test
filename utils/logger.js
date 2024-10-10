const fs = require('fs');
const path = require('path');
const winston = require('winston');

const logDir = path.join(__dirname, '../logs');

// Create a custom log format
const customFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}${stack ? `\nStack: ${stack}` : ''}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    customFormat           
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
    // new winston.transports.File({ filename: './logs/combined.log' }),
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    // new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.Console()
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logDir, 'exceptions.log') })
  ],
  exitOnError: false  
});

module.exports = logger;
