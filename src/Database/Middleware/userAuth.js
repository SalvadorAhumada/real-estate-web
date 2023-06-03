/* const express = require("express"); */
const db = require("../Models");
const User = db.users;
const jwt = require("jsonwebtoken");

 const saveUser = async (req, res, next) => {
 try {
   const username = await User.findOne({
     where: {
       userName: req.body.userName,
     },
   });

   if (username) {
     return res.json(409).send("username already taken");
   }

   const emailcheck = await User.findOne({
     where: {
       email: req.body.email,
     },
   });

   if (emailcheck) {
     return res.json(409).send("Email already exists");
   }

   next();
 } catch (error) {
   console.log(error);
 }
};

const validateUser = async (request, response, next) => {
  try {

    const tokenFromHeader = await request.headers.authorization.split(" ")[1];

    const matchedToken = await jwt.verify(tokenFromHeader, process.env.SECRET_KEY);

    const user = await matchedToken;
  
    request.user = user;

    next();
    
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
}

//exporting module
 module.exports = {
 saveUser,
 validateUser
};