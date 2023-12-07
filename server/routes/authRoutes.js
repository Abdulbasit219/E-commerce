const express = require('express')
const { registerController,loginController, testController } = require('../controller/auth');
const { requiredSignIn,adminController } = require('../middlewares/middleware');

//router Object
const router = express.Router()

//Register routes
router.post('/register', registerController)

//Login routes
router.post('/login', loginController);

//test routes
router.get('/test',requiredSignIn,adminController,testController);

module.exports = router
