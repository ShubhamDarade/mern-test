# Blog Project README

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Testing](#testing)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Overview

This project is a full-featured blogging application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to create, read, update, and delete blog posts, as well as like and dislike them. Users can register, log in, and verify their emails through OTP for enhanced security.

---

## Technologies Used

- **Frontend:**
  - React
  - Redux (for state management)
  - Axios (for API calls)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with MongoClient)
  - JWT (for authentication)

- **Testing:**
  - Jest (for unit and integration testing)
  - Supertest (for API testing)

---

## Features

- User registration and login with email verification using OTP.
- CRUD functionality for blog posts.
- Like and dislike features for user engagement.
- Image uploads using Multer for blog posts.
- Responsive design for mobile and desktop views.
- Admin panel for managing users and blog posts.

---

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/blog-project.git
    cd blog-project
    ```

2. Install dependencies for both the client and server:

    - For the server:
      ```bash
      cd server
      npm install
      ```

    - For the client:
      ```bash
      cd client
      npm install
      ```

3. Set up your environment variables in a `.env` file in the server directory. Use the provided `.env.example` as a reference.

---

## Usage

1. Start the server:
    ```bash
    cd server
    npm start
    ```

2. Start the client:
    ```bash
    cd client
    npm start
    ```

The application will be accessible at `http://localhost:3000`.

---

## API Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in a user.
- **POST /api/auth/verify**: Verify user email using OTP.

### Blog Posts

- **GET /api/posts**: Get all blog posts.
- **POST /api/posts**: Create a new blog post.
- **GET /api/posts/:id**: Get a blog post by ID.
- **PUT /api/posts/:id**: Update a blog post.
- **DELETE /api/posts/:id**: Delete a blog post.
- **POST /api/posts/:id/like**: Like a blog post.
- **POST /api/posts/:id/dislike**: Dislike a blog post.

---

## Testing

To run tests for this project, follow these steps:

1. Ensure you are in the server directory:
    ```bash
    cd server
    ```

2. Run the tests:
    ```bash
    npm test
    ```

This will execute all the unit and integration tests defined in the project.

---

## Postman Collection for API Testing

We've included a Postman collection for testing the API. You can find it in the `postman/` directory.

### How to Use the Postman Collection:

1. Download the [Postman collection](postman/collection.json) from the repository.
2. Open Postman and go to **File > Import**.
3. Choose the downloaded `collection.json` file.
4. Use the imported requests to test the API.

---

## API Documentation

Swagger documentation is available for the API. To access it, run the server and visit [http://localhost:8000/api-docs](http://localhost:8000/api-docs).

---

## Contributing

We welcome contributions to this project! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/YourFeature
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add some feature"
    ```
4. Push your changes:
    ```bash
    git push origin feature/YourFeature
    ```
5. Open a pull request detailing your changes.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Acknowledgments

- Special thanks to the open-source community for providing libraries and tools that made this project possible.
- Inspiration from various blog platforms and projects.

