const db = require("../../../models");
const User = db.users;

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

const authenticateUser = async(req,res,next) => {
  
    let cookie = req.headers['cookie'];
  
    if(!cookie) return res.status(403).send({ jwt: false, msg: "Not authenticated" });
  
    let headers = cookie.split(' ');
    
    let jwt = headers.find(head => head.includes('jwt'))
  
    if(!jwt) return res.status(403).send({ jwt: false, msg: "Not authenticated" });
    
    jwt = jwt.split("=");
    
    jwt = jwt[1];
    // If logged out set to false
    if(jwt === "") return res.status(403).send({ jwt: false, msg: "Not authenticated" });

    next();
}

 module.exports = {
 saveUser,
 authenticateUser
};