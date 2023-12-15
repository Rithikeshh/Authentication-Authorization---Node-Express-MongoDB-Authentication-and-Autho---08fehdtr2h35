const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'your-secret-key'; // Replace with your secret key

app.use(bodyParser.json());

// Mock user data (replace with a database in a real application)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Authentication endpoint (students should implement this)
app.post('/login', (req, res) => {
  // Implement user authentication logic here
  const {username, password} = req.body;
  const user = users.find((user)=>{
    return user.username == username;
  })
  if (!user || user.password != password) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // If authentication is successful, generate a JWT token and send it in the response
  // Example token generation:
  const token = jwt.sign({ userId: user.id, username: user.username }, secretKey);
  res.status(201).json({ token });
});

// Protected route (students should implement this)
app.get('/profile', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization required' });
    }
    const decodedToken = jwt.verify(token, secretKey)
    return res.status(201).json({
      "message": "Profile data",
      "user": decodedToken
    })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
    
  }
  // Middleware to check for a valid JWT token
  // Implement JWT token verification logic here
  // If the token is valid, students can access the user's data from 'decoded'
  // Example response:
  // res.status(201).json({ message: 'Profile data', user: decoded });
});

module.exports = app;
