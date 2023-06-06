const express = require('express')
const app = express()
const port = 5500

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;

  // Store email and password (as is for now) in the USERS array above (only if the user with the given email doesn't exist)
  const existingUser = USERS.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User with the provided email already exists' });
  }

  USERS.push({ email, password });

  // Return back 200 status code to the client
  return res.sendStatus(200);
});


app.post('/login', function(req, res) {
 // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;

  // Check if the user with the given email exists in the USERS array
  const user = USERS.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Ensure that the password is the same
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // If the password is the same, generate a token (any random string will do for now)
  const token = generateToken();

  // Return back 200 status code and the token to the client
  return res.status(200).json({ token });
});

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send("Hello World from route 3!")
})

app.get("/submissions", function(req, res) {
  // Return the user's submissions for this problem
  const userEmail = req.query.email; // Assuming the email is passed as a query parameter

  // Find the user in the USERS array
  const user = USERS.find(user => user.email === userEmail);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Retrieve the user's submissions for this problem (assuming it's stored in the user object)
  const submissions = user.submissions; // Adjust this based on your data structure

  // Return the submissions to the client
  return res.status(200).json(submissions);
});


// Create a route that lets an admin add a new problem
app.post('/problems', function(req, res) {
  // Check if the user is an admin
  const isAdmin = req.headers.authorization === 'Bearer ADMIN_TOKEN'; 
  if (!isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Add logic to handle the creation of a new problem
  // ...
  // ...

  // Return a success message or appropriate response to the client
  return res.status(200).json({ message: 'Problem created successfully' });
});

// Set up the server to listen on the specified port
app.listen(port, function() {
  console.log(`Example app listening on port ${port}`);
});
