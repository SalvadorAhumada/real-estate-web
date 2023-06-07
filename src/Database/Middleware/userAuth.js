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

const authenticateUser = async (req, res, next) => {

  if(!req.headers['cookie']) return res.status(403).send({ jwt: false, msg: "Token vencido. Iniciar sesión para continuar" });

  let cookies = req.headers['cookie'];

  cookies = cookies.split(";");

  cookies.forEach(cookie => {

    if (cookie.includes("ar3djwt")) {

      let value = cookie.split("=")[1];
      if (!value) return res.status(403).send({ jwt: false, msg: "Not authenticated" });
      
    }

  })

  next();
}

module.exports = {
  saveUser,
  authenticateUser
};