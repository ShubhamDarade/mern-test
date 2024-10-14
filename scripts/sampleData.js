// sampleData.js
module.exports = {
  users: [
    {
      _id: '612f1b3f4f1a2a8d1f5c3e1a',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '612f1b4f5f1b3a9d2e4c3e2b',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      password: 'password456',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  blogs: [
    {
      _id: '713g1c4h5g2h4d8e1g5d3h1c',
      title: 'Understanding JavaScript Closures',
      content: 'JavaScript closures are a powerful concept...',
      authorId: '612f1b3f4f1a2a8d1f5c3e1a', // Refers to user John Doe
      likes: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '714h2d5j6h3j5e9f2h6d4j2d',
      title: 'An Introduction to Node.js Streams',
      content: 'Node.js streams are used to handle I/O efficiently...',
      authorId: '612f1b4f5f1b3a9d2e4c3e2b', // Refers to user Jane Smith
      likes: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
}
