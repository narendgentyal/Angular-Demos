const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const passport = require('passport');
const config = require('../config/database');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to Register'
            });
        }
        else {
            res.json({
                success: true,
                msg: 'User is Registered'
            });
        }
    })
})

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUsersByUserName(email, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.json({
                success: false,
                msg: 'User not found'
            })
        User.comparePassword(password, user.password,
            (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign(user.toObject(),
                        config.secret, { expiresIn: 604800 })

                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            name: user.name,
                            username: user.username,
                            email: user.email
                        }
                    })
                }
                else {
                    return res.json({
                        success: false,
                        msg: 'Wrong Password'
                    })
                }
            })
    })
})

// router.get('/register', (req, res, next) => {
//     res.send('Register');
// })

// router.get('/authenticate', (req, res, next) => {
//     res.send('authenticate');
// })

// router.get('/validate', (req, res, next) => {
//     res.send('validate');
// })

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
})

module.exports = router;