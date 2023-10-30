const express  = require("express");
const { BlackListModel } = require("../models/blackList.model");
const jwt = require('jsonwebtoken');

const logoutRoute = express.Router()

logoutRoute.post("/", (req, res)=>{
    // const token = req.header('Authorization')?.split(' ')[1];
    // console.log(token);
    // try {
    //     jwt.verify(token, "masai", (err, decoded) => { 
    //         if (err) {
    //             return res.status(401).send({ "message": 'Invalid token' });
    //         }
    //         const expirationDate = new Date(decoded.exp * 1000);
    //         const blacklistToken = new BlackListModel({ token, expirationDate });
    //         blacklistToken.save();
    //         return res.status(200).send({ "message": 'User logged out successfully' });
    //     });
    // } catch (error) {
    //     return res.status(500).send({ "message": 'Logout failed' });
    // }
})

module.exports={logoutRoute}