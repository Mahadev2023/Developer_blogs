const express = require('express');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const { Sequelize, Op } = require('sequelize');

const signupLoginRoute = express.Router();


const sequelize = require('../db');
const { users: User, posts: Post, category: Category } = sequelize.models;

const verifyToken = require('../middleware/authJWT');

signupLoginRoute.get('/', (req, res, next) => {
    res.json("You are at home");
})


// userRoute.get('/',async(req,res,next)=>{
//     const allusers=await User.findAll();
//     res.status(200).json(allusers);
// })

signupLoginRoute.post('/signup', async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        if (!email) {
            throw new Error("Please Enter Email");
        }
        if (!password) {
            throw new Error("Please Enter Password");
        }
        if (!username) {
            throw new Error("Please Enter username");
        }
        let oldUser = await User.findOne({
            where: {
                username: username
            }
        })
        if (oldUser) {
            throw new Error("USERNAME IS ALLREADY register");
        }


        oldUser = await User.findOne({ where: { email: email } });
        if (oldUser) {
            throw new Error("EMAIL IS ALLREADY register");
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            username: username,
            password: hashPassword,
            email: email
        })
        res.status(201).json({
            Message: "SIGNUP SUCCESS", newUser: {
                user_id: newUser.user_id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (err) {
        next(err);
    }

})



// "username": "Abhi",
// "email": "abhi@gmail.com",
// "password": "abhi1234"

// "user_id": 4,
// "username": "mahadev5",
// "email": "mahadev5@gmail.com",
// "password": "mahadev5"

signupLoginRoute.post('/login', async (req, res, next) => {

    const { email, password } = req.body;

    try {
        if (!email) {
            throw new Error("Please Enter Email");
        }
        if (!password) {
            throw new Error("Please Enter Password");
        }

        let loginUser = await User.findOne({
            where: {
                email: email
            }
        })
        if (!loginUser) {
            throw new Error("EMAIL IS NOT REGISTER ENTER VALID ONE");
        }
        var passwordIsValid = bcrypt.compareSync(
            password,
            loginUser.password
        )

        if (!passwordIsValid) {
            res.status(401).json({ message: "Invalid Password", accessToken: null });
        }


        var token = jwt.sign({
            user_id: loginUser.user_id
        }, process.env.API_SECRET, {
            expiresIn: "50m" 
        })
        res.json({
            MSG: "Login SUCCESS",
            USER: { username: loginUser.username, user_id: loginUser.user_id },
            accessToken: token,

        });

    } catch (err) {
        next(err);
    }
})
signupLoginRoute.use('/hiddencontent', verifyToken, (req, res) => {
    if (!req.user) {
        res.status(403).send({ message: "Invalid JWT token" });
    }
    // console.log(req.user);
    if (req.user.user_id===10) {
        res.status(200)
            .send({
                message: "Congratulations! but there is no hidden content"
            });
    } else {
        res.status(403)
            .send({
                message: "Unauthorised access from hiddencontent"
            });
    }
})




module.exports = signupLoginRoute;







