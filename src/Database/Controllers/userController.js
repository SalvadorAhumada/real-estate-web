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

  const noAuth = { jwt: false, msg: "Not authenticated" }

  let cookies = req.headers['cookie'];

  if (!cookies) return res.status(403).send(noAuth);

  try {

    cookies = cookies.split("; ");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];

      if (cookie.includes("ar3djwt")) {

        let value = cookie.split("=")[1];

        if (value) {

          return res.status(200).send({ jwt: value })

        } else {
          return res.status(403).send(noAuth);
        }
      }
    }
    return res.status(403).send(noAuth);
  } catch (ex) {
    return res.status(403).send(noAuth);
  }

}
/**
 * Creates new user
 * POST api/users/signup
 * @param {email} string  
 * @param {password} string
 */
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = {
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
    
    let user = await USER.findOne({
      where: { email: email },
      raw: true
    });

    if (!user) return res.status(401).send({ error: true, msg: "Error con correo o contraseña" })

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) return res.status(401).send({ error: true, msg: "Error con correo o contraseña" });

    let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: MILISECONDS
    });
    delete user.password;
    delete user.deletedAt;

    res.cookie("ar3djwt", token, { maxAge: MILISECONDS, httpOnly: true });
    
    return res.status(201).send({
      message: "Login Successful",
      email,
      token,
      user,
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
      attributes: {
        exclude: ['password']
      },
      order: [
        ['id', 'ASC']
      ]
    });

    res.status(200).send(user);

  } catch (ex) {
    res.status(403).send({ jwt: false, msg: "Error" });
  }
}
/**
 * List of all users
 * POST api/users/update
 *  * @param {user} USER
 */
const update = async (req, res) => {

  let updateUser = req.body;
  const id = updateUser.id;
  delete updateUser.id;
  delete updateUser.createdAt;
  delete updateUser.updatedAt;

  let toUpdate = {}

  try {

    const existingUser = await USER.findOne({ where: { id } });

    for (let key in updateUser) {
      const updatedValue = updateUser[key];
      const existingValue = existingUser[key];

      if (updatedValue !== existingValue) {
        toUpdate[key] = updatedValue;
      }
    }

    const user = await USER.update(
      { ...toUpdate },
      { where: { id } }
    )
    res.status(200).send({ data: user });

  } catch ({ name }) {

    switch (name) {
      case 'SequelizeUniqueConstraintError':
        res.status(409).send({ errorCode:409, msg: 'Correo electrónico ya existe en base de datos' });
      break;
    }

  }
}
/**
 * List of all users
 * POST api/users/update
 *  * @param {userId} integer
 *  * @param {currentUserId} integer
 */
const delete_user = async (req, res) => {

  /*
  TODO: No permitir que se elimine a si mismo 
  */

  console.log("-----------------------------")
  console.log(req.user)
  return res.status(200)

  const { userId } = req.body

  try {

    const deletedUser = await USER.destroy({
      where: { id: userId }
    });

    res.status(200).send({ data: deletedUser });

  } catch (ex) {

  }


}


module.exports = {
  signup,
  login,
  authenticate,
  logout,
  users,
  update,
  delete_user
};