const express = require('express');
const { loginController, registerController, updateProfile} = require('../controllers/userController');
 // Create a new controller file
//router object 
const router = express.Router()

//POST||LOGIN
router.post('/login',loginController)

//POST || REGISTER USER
router.post('/register',registerController);
router.post('/update-profile',updateProfile);




module.exports = router;