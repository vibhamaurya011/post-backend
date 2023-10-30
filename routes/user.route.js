const express = require('express');
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModle } = require('../models/user.model');


userRoute.post('/register', async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    const existingUser = await UserModle.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists, please login' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModle({
      name,
      email,
      gender,
      password: hashedPassword,
      age,
      city,
      is_married,
    });
    await user.save();
    res.status(200).send({ "message": 'User registered successfully', "user":user});
  } catch (error) {
    res.status(400).send({ "message": 'Registration failed' });
  }
});

userRoute.post('/login', async (req, res) => {
    const {email, password} =req.body
    try{
        const user = await UserModle.findOne({email})
        bcrypt.compare(password, user.password, (err, result)=> {
            if(result){
                const token = jwt.sign({name:user.name, userID:user.id},"masai")
                res.status(200).send({"msg":"Login Succesfull", "token":token})
            }else{
                res.status(400).send({"Error":err.message})
            }
        });
    }catch(err){
        res.status(400).send({"Error":err.message})
    }
});


module.exports = {userRoute};
