const express = require('express');
const usercontroller = require("../controller/user")
const uservalidator = require("../middleware/validation/user")

const router = express.Router();
const morgan = require('morgan')

// router.route('/').get((req,res)=>{
//     res.send('users list')
// }).post((req,res)=>{
//     res.send('create user')
// })

router.post('/login',uservalidator.validate("LOGIN"),usercontroller.login)
router.post('/signUp',uservalidator.validate("SIGNUP"),usercontroller.signUp)
router.get('/',usercontroller.getAllUsers)
router.put("/:id",
   uservalidator.validate("UPDATE"),
    usercontroller.updateUser
  )
module.exports = router

