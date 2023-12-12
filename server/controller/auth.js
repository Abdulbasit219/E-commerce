const { models } = require('mongoose');
const { hashedPassword, comparePassword } = require('../helper/bcr_helper');
const model = require('../models/userSchema');
const JWT = require('jsonwebtoken')

module.exports = {
    registerController: async (req, res) => {

        try {
            const { name, email, password, question, isAdmin } = req.body;

            //validation
            if (!name || !email || !password || !question) {
                return res.send({ message: 'All fields are required' });
            }

            //check user 
            const ExistingUser = await model.findOne({ email })
            if (ExistingUser) {
                return res.status(200).send({
                    success: false,
                    message: 'User already Register in this email address'
                })
            }

            //Password Hashed
            const hashPassword = await hashedPassword(password);

            //register user
            const user = await new model({ name, email, password: hashPassword, question, isAdmin }).save();
            res.status(201).send({
                success: true,
                message: 'User Register successfully',
                user
            })

        } catch (err) {
            console.log(err)
            res.status(500).send({
                success: false,
                message: 'Error in RegisterController'
            });
        }
    },

    loginController: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(404).send({
                    success: false,
                    message: 'Invalid email or password'
                })
            }

            //check user
            const user = await model.findOne({ email });
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'User not found'
                })
            }

            const matchPassword = await comparePassword(password, user.password);
            if (!matchPassword) {
                return res.status(200).send({
                    success: false,
                    message: 'Invalid credentials'
                })
            }

            //JW token
            const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY,
                { expiresIn: "7d" }
            )

            res.status(200).send({
                success: true,
                message: 'login successfully',
                user: {
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                token,
            })

        } catch (err) {
            console.log(err)
            res.status(500).send({
                success: false,
                message: 'Error in LoginController'
            })
        }
    },

    testController: (req, res) => {
        res.status(200).send({
            success: true,
            message: 'Protected routes'
        })
    },

    userAndAdminController: (req, res) => {
        res.status(200).send({ ok: true });
    },

    forgotPasswordController: async (req, res) => {
        try {
            const { email, newPassword, question } = req.body;

            if (!email || !newPassword || !question) {
                return res.status(400).send({ message: 'All fields are required' })
            }
            const user = await model.findOne({ email, question })
            if (!user) {
                return res.status(404).send({
                    success: false,
                    message: 'Wrong Email or Answer'
                })
            }
            const hashPassword = await hashedPassword(newPassword)
            await model.findByIdAndUpdate(user._id, { password: hashPassword })
            res.status(200).send({
                success: true,
                message: 'Password updated successfully'
            })
        } catch (err) {
            console.log(err)
            res.status(404).send({
                success: false,
                message: 'Something went wrong',
                err
            })
        }
    }
}
