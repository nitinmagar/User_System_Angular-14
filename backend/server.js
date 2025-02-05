const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const USERS_FILE = './users.json';

// Get all users
app.get('/users', (req, res) => {
  fs.readFile(USERS_FILE, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading users file');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Add a new user
app.post('/users', (req, res) => {
  debugger;
  const newUser = req.body;
  fs.readFile(USERS_FILE, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading users file');
    } else {
      const users = JSON.parse(data);
      users.push(newUser);
      fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error writing users file');
        } else {
          res.status(201).send('User added successfully');
        }
      });
    }
  });
  console.log(res);
});

// Update a user
app.put('/users/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const updatedUser = req.body;
  fs.readFile(USERS_FILE, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading users file');
    } else {
      const users = JSON.parse(data);
      users[index] = updatedUser;
      fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error writing users file');
        } else {
          res.status(200).send('User updated successfully');
        }
      });
    }
  });
});

// Delete a user
app.delete('/users/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  fs.readFile(USERS_FILE, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading users file');
    } else {
      const users = JSON.parse(data);
      users.splice(index, 1);
      fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          res.status(500).send('Error writing users file');
        } else {
          res.status(200).send('User deleted successfully');
        }
      });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
