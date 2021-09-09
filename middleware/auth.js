const jwt = require("jsonwebtoken");
const User = require("../model/users");

const auth = async (req, res, next) => {
  console.log("auth");
  try {
    const cookieToken = await req.cookies.jwtdata;
    if (!cookieToken) {
      return res.status(422).send({ message: "User Does not exist token" });
      next();
    }

    // console.log(cookieToken);
    const tokenData = await jwt.verify(cookieToken, process.env.SECRET_KEY);
    const isUser = await User.findOne({ _id: tokenData.id });
    // console.log(isUser);
    if (!isUser) {
      return res.status(422).send({ message: "User Does not exist" });
      next();
    }
    req.isUser = isUser;
    req.cookieToken = cookieToken;
    next();
  } catch (err) {
    console.log(" Error ::::::::: " + err);
  }
};

module.exports = auth;
