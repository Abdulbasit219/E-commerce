const express = require('express')
const {
    registerController,
    loginController,
    testController,
    userAndAdminController,
    forgotPasswordController,
    updateProfileController,
    getorderController
    } = require('../controller/auth');
const { requiredSignIn, adminController } = require('../middlewares/middleware');

//router Object
const router = express.Router()

//Register routes
router.post('/register', registerController);

//Login routes
router.post('/login', loginController);

//test routes
router.get('/test', requiredSignIn, adminController, testController);

//protected routes for user auth
router.get('/user', requiredSignIn, userAndAdminController);

//protected routes for admin 
router.get('/admin', requiredSignIn, adminController, userAndAdminController);

//forgot Password
router.post('/forgotpassword', forgotPasswordController);

//Update Profile
router.put('/Profile', requiredSignIn, updateProfileController);

//order
router.get('/order', requiredSignIn, getorderController);

module.exports = router
