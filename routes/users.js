var express = require('express');
var router = express.Router();
const { createUser } = require('../Controllers/Auth/loginController');

/* GET users listing. */
// router.get('/', middleware, function(req, res, next) {
//   console.log('Home')
//   res.send('respond with a resource');
// });

// function middleware(req, res, next) {
//   console.log('Before Next')
//   next()
//   console.log('After Next')
// }

/* Logging Middleware */
// router.get('/', (req, res) => {
//    res.json({
//      'status':true
//    });
// });


/* Router Level Middleware */
// router.use((req,res,next)=>{
//   console.log("Time:",new Date())
//   next()
// })


// router.get("/:id",(req,res,next)=>{
//   console.log('Request URL:', req.originalUrl)
//   next()
// },(req,res,next)=>{
//   console.log('Request Type:', req.method)
//   next()
// },(req,res)=>{
//   res.json({
//       status:true,
//       id:req.params.id
//   })
// })

router.post('/', createUser);


module.exports = router;
