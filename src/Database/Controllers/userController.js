const bcrypt = require("bcrypt");
const db = require("../../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const USER = db.users;

const MILISECONDS = 3600000;
/**
 * Creates new user
 * POST api/users/authenticate
 * @param {cookie} string  
 */
const authenticate = async (req, res) => {

  let cookies = req.headers['cookie'];

  try {

    cookies = cookies.split(";");

    cookies.forEach(cookie => {

      if (cookie.includes("ar3djwt")) {

        let value = cookie.split("=")[1];
        if (value) {
          return res.status(200).send({
            jwt: value
          })
        } else {
          return res.status(403).send({ jwt: false, msg: "Not authenticated" });
        }
      }

    })
  } catch (ex) {
    return res.status(403).send({ jwt: false, msg: "Not authenticated" });
  }

}
/**
 * Creates new user
 * POST api/users/signup
 * @param {email} string  
 * @param {password} string
 * @param {userName} string
 */
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    const user = await USER.create(data);

    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: 3600000,
      });

      res.cookie("ar3djwt", token, { maxAge: 3600000, httpOnly: true });
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};
/**
 * Logins user
 * POST api/users/login
 * @param {email} string  
 * @param {password} string
 */
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await USER.findOne({
      where: {
        email: email
      }

    });

    if (!user) return res.status(401).send({ error: true, msg: "Error con correo o contraseña" })

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) return res.status(401).send({ error: true, msg: "Error con correo o contraseña" });

    let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: MILISECONDS
    });

    res.cookie("ar3djwt", token, { maxAge: MILISECONDS, httpOnly: true });
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
/**
 * Logout user
 * POST api/users/logout
 */
const logout = async (_req, res) => {

  res.cookie('ar3djwt', '', { expiresIn: new Date(0) });

  return res.status(200).send({ jwt: false });
}
/**
 * List of all users
 * GET api/users/
 */
const users = async (_req, res) => {

  try {

    const user = await USER.findAll({
      attributes: { exclude: ['password'] }
    });

    res.status(200).send(user);

  } catch (ex) {
    res.status(403).send({ jwt: false, msg: "Error" });
  }
}


module.exports = {
  signup,
  login,
  authenticate,
  logout,
  users
};