const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

const User = db.users;

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
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

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

    //if password is the same
    //generate token with the user's id and the secretKey in the env file

    let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });

    //if password matches wit the one in the database
    //go ahead and generate a cookie for the user
    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
    return res.status(201).send({
      message: "Login Successful",
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};