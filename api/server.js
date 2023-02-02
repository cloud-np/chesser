const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './.env.example' });
const helmet = require('helmet');
const morgan = require('morgan');
const postRoutes = require('./routes/postRoutes');


const app = express();
app.use(express.json());

// Security
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
// Logging
app.use(morgan("common"));
app.use("/api/posts", postRoutes);

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

app.get('/test', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'success!' })
});

app.post("/login", (req, res) => {
  // if (!req.headers['content-length']) {
  //   return res.status(400).json({ message: 'Empty request body' });
  // }
  // const contentLength = parseInt(req.headers['content-length'], 10);
  // if (contentLength === 0) {
  //   return res.status(400).json({ message: 'Empty request body' });
  // }
  // console.log(`${username} is trying to login ..`);

  return res.status(200).json({ token: jwt.sign('test-username', process.env.JWT_ACCESS_TOKEN) });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});