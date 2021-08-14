const express = require("express");
const rout = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/users");
const auth = require("../middleware/auth");
const { Router } = require("express");

rout.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email, phone, work, password, conpassword } = req.body;

  if (!name || !email || !phone || !password || !conpassword || !work) {
    res.status(400).send({ message: "Fill all data" });
  }

  try {
    if (password === conpassword) {
      const userExist = await User.findOne({ email });
      console.log(userExist);
      userExist ? res.status(422).send({ error: "User Exist" }) : null;

      const saveData = new User({ name, email, phone, work, password });
      const respo = await saveData.save();
      res.status(201).send({ data: respo });
    } else {
      res.send("password and confirm password does not match");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

rout.post("/signin", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  console.log(`${email} and ${password}`);
  try {
    const data = await User.findOne({ email });
    !data && res.status(422).send({"message":"Invalid Details"});
    const isLogin = await bcryptjs.compare(password, data.password);
    if (isLogin) {
      const token = await data.createToken();
      console.log(token);
      res.cookie("jwtdata", token, {
        expires: new Date(Date.now() + 60 * 60 * 2 * 1000),
        httpOnly: true,
      });
      res.status(200).json({ message: "Signin successfully" });
    } else {
      res.status(422).send({"message":"Invalid Details"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

rout.get("/aboutPage", auth, (req, res) => {
  console.log(req.isUser);

  res.status(200).send(req.isUser);
});

rout.get("/contact", auth, (req, res) => {
  console.log(req.isUser);

  res.status(200).send(req.isUser);
});

rout.post("/contact", auth, async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    // console.log(`----------------------------------------------   --  ${name}  ${phone} ${email} ${message}`)
    req.isUser.messages = req.isUser.messages.concat({
      name,
      phone,
      email,
      message,
    });
    await req.isUser.save();
    res.status(201).send({ message: "form submited" });
  } catch (err) {
    console.log(err);
    res.send({ message: "Error" });
  }
});

rout.get("/authenticate", auth, (req, res) => {
  res.status(200).send(req.isUser);
});

rout.get("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("jwtdata");
    req.isUser.tokens = req.isUser.tokens.filter((data) => {
      return data.token !== req.cookieToken;
    });
    await req.isUser.save();
    res.status(200).send({ message: "you are logout" });
  } catch (err) {
    console.log(err);
    res.send({ message: err.toString() });
  }
});

rout.post("/editprofile", auth, async (req, res) => {
  try {
    const { name, email, phone, work, id } = req.body;
    const isEmailValid = await User.findOne({ email });
    if (isEmailValid) {
      console.log(isEmailValid._id.toString() === id.toString());
      if (isEmailValid._id.toString() === id.toString()) {

        const resUser = await User.updateOne(
          { _id: id },
          { $set: { name: name, email: email, phone: phone, work: work } }
        );
        console.log("res" + resUser);

        res.status(200).send({ "message": "data updated" });
      } else {
        res.status(422).send({ "message": "Email exist" });
      }
    } else {
      const resUser = await User.updateOne(
        { _id: id },
        { $set: { name: name, email: email, phone: phone, work: work } }
      );
      console.log("res" + resUser);

      res.status(200).send({ "message": "data updated" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = rout;

// "name":"jimit",
//     "email":"test1@gmail.com",
//     "phone":"122344",
//     "work":"wen dev",
//     "password":"hello",
//     "conpassword":"hello"
