const bcrypt = require("bcrypt");
const db = require("../../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = db.users;

const MILISECONDS = 3600000;
/*
** api/users/authenticate
 */
const authenticate = async (req, res) => {
  let cookie = req.headers['cookie']
  
  let headers = cookie.split(' ');
  
  let jwt = headers.find(head => head.includes('jwt'))
  
  jwt = jwt.split("=")
  
  jwt = jwt[1];

  return res.status(200).send({
    jwt
  })
}
/*
** api/user/signup
 */
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    const user = await User.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 3600000,
      });

      res.cookie("jwt", token, { maxAge: 3600000, httpOnly: true });
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};
/*
** api/user/login
 */
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email
      }

    });

    if (!user) return res.status(401).send("No user found")

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) return res.status(401).send("Password failed");

    let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: MILISECONDS
    });

    res.cookie("jwt", token, { maxAge: MILISECONDS , httpOnly: true });
    return res.status(201).send({
      message: "Login Successful",
      email,
      token,
      ok: true
    });
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
  authenticate
};