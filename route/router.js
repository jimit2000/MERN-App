const express = require("express");
const rout = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");


const User = require("../model/users");
const auth = require("../middleware/auth");
const { Router } = require("express");
const path = require("path");

rout.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email, phone, work, password, conpassword } = req.body;

  if (!name || !email || !phone || !password || !conpassword || !work) {
    return res.status(400).send({ message: "Fill all data" });
  }

  try {
    if (password === conpassword) {
      const userExist = await User.findOne({ email });
      console.log(userExist);
      if (userExist) {
        return res.status(422).send({ message: "Email exist" });
      }

      const saveData = new User({ name, email, phone, work, password });
      const respo = await saveData.save();
      res.status(201).send({ message: "Register successfully" });
    } else {
      return res
        .status(400)
        .send({ message: "password and confirm password does not match" });
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

  if (!email || !password) {
    res.status(400).send({ message: "Fill the data" });
  }

  console.log(`${email} and ${password}`);
  try {
    const data = await User.findOne({ email });
    !data && res.status(422).send({ message: "Invalid Details" });
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
      res.status(422).send({ message: "Invalid Details" });
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
    if (!name || !phone || !email || !message) {
      // res.setHeader("Content-Type","application/json");
      return res.status(400).send({ message: "Fill data" });
    }
    req.isUser.messages = await req.isUser.messages.concat({
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

        res.status(200).send({ message: "data updated" });
      } else {
        res.status(422).send({ message: "Email exist" });
      }
    } else {
      const resUser = await User.updateOne(
        { _id: id },
        { $set: { name: name, email: email, phone: phone, work: work } }
      );
      console.log("res" + resUser);

      res.status(200).send({ message: "data updated" });
    }
  } catch (err) {
    console.log(err);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, "./client/public/uploadFile/");
  },
  filename: function (req, file, next) {
    next(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, next) => {
  const availExtension = ["image/jpg", "image/jpeg", "image/png"];
  if (availExtension.includes(file.mimetype)) {
    next(null, true);
  } else {
    next(null, false);
  }
};

const upload = multer({ storage, fileFilter });

rout.post("/add_post", upload.single("imageName"), auth, async (req, res) => {
  try {
    // console.log(req.file.originalname);

    // console.log(req.file.filename);
    const topicname = req.body.topicname;
    const imageName = req.file.filename;
    console.log(req.body.data);
    const data = req.body.data;

    const postdata = await req.body.data.split("$%$^");

    //  console.log(topicname);

    req.isUser.post = await req.isUser.post.concat({
      topicname: topicname,
      topicdata: postdata,
      image: imageName,
    });
    await req.isUser.save();
    res.status(201).send("adeed");
  } catch (err) {
    console.log(err);
  }
});

rout.get("/getHomeData", async (req, res) => {
  try {
    const data = await User.find({}, { post: 1 });
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
});

rout.get("/viewinfo", async (req, res) => {
  try {
    const { id } = req.query;
    const data = await User.find({ "post._id": id }, { post: 1 });
    res.status(200).send(data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

rout.post("/viewinfo", async (req, res) => {
  try {
    const { commentData, id } = req.body;
    console.log(id);

    const data = await User.findOne({ "post._id": id }, { post: 1 });

    req.data = data;
    req.data.post = req.data.post.filter((data1) => {
      if (data1._id == id) {
        return (data1.comments = data1.comments.concat({
          comment: commentData,
        }));
      } else {
        return data1.comments;
      }
    });

    await req.data.save();
    res.status(201).send({ message: "comment Added" });
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
