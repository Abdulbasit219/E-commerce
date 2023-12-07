const JWT = require('jsonwebtoken')
const model = require('../models/userSchema');

// protected routes from tokenbase
module.exports = {
    requiredSignIn: async (req,res,next) => {
        try{
            const token_Verify = JWT.verify(req.headers.authorization, process.env.SECRET_KEY)
            req.user = token_Verify;
            next();
        }catch(err){
            console.log(err)
        }
    },
    adminController: async (req, res, next) => {
        try{
            const user = await model.findById(req.user._id);
            if(user.isAdmin !== 1){
                return res.status(401).send({
                        success: false,
                        message: 'unAuthorized Access'
                })
            }else{
                next();
            }
        }catch(err){
            console.log(err)
        }
    } 
}