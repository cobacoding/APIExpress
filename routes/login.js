var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// router.post('/', (req, res) => {
//     // Mock user
//     const user = {
//         id: 1,
//         username: 'dodolijo',
//         email: 'dodolijo@gmail.com'
//     }
//     jwt.sign({user}, 'secretkey', { expiresIn: '30s'}, (err, token) => {
//         res.json({
//           token  
//         })
//     });
// });

// router.post('/', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if(err) {
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 message: 'Post created...',
//                 authData
//             });     
//         }
//     });
// });

// // Verify Token
// function verifyToken(req, res, next) {
//     // Get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undifined
//     if(typeof bearerHeader !== 'undefined') {
//         // Split at the space
//         const bearer = bearerHeader.split(' ');
//         // Get token from array
//         const bearerToken = bearer[1];
//         // Set the token
//         req.token = bearerToken;
//         // Next middleware
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }

const posts = [
  {
      username: 'tes1',
      title: 'Post 1'
  }
  ,{
      username: 'tes2',
      title: 'Post 2'
  }
]

// router.get('/posts', (req, res) => {
//      res.json(posts);
// });

// pakai authenticate
router.get('/', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
  })
}


 module.exports = router;