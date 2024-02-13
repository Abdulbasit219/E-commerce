const JWT = require('jsonwebtoken')
const model = require('../models/userSchema');

// protected routes from tokenbase
module.exports = {
    requiredSignIn: async (req,res,next) => {
        try{
            const tokenVerify = JWT.verify(req.headers.authorization, process.env.SECRET_KEY)
            req.user = tokenVerify;
            next();
        }catch(err){
            console.log(err)
            return res.status(401).json({
                success: false,
                message: 'Unauthorized Access in user signIn'
            });
        }
    },
    adminController: async (req, res, next) => {
        try{
            const user = await model.findById(req.user._id);
            if(!user || user.isAdmin !== 1){
                return res.status(401).send({
                        success: false,
                        message: 'unAuthorized Access'
                })
            }else{
                next();
            }
        }catch(err){
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    } 
}