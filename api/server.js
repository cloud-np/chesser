const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './.env.example' });
const helmet = require('helmet');
const morgan = require('morgan');


const app = express();
app.use(express.json());
// app.use(cors());
// Security
// app.use(helmet());
// Logging
app.use(morgan("common"));

const posts = [
  {
    username: 'Kyle',
    title: 'Post 1'
  },
  {
    username: 'Jim',
    title: 'Post 2'
  }
]

app.get('/posts', authenticateToken, (req, res) => {
//   res.json(posts.filter(post => post.username === req.user.name))
  res.json('eeeeeeeeeeeeelaaa')
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.post("/login", (req, res) => {
    const username = req.body.username;
    console.log(`${username} is trying to login ..`);

    return res.json({ token: jwt.sign(username, process.env.JWT_ACCESS_TOKEN) });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});