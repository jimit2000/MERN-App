const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  messages: [
    {
      name: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 3,
      },
      email: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  post: [
    {
      topicname: {
        type: String,
      },
      topicdata: [String],
      image: {
        type: String,
      },
      comments: [
        {
          comment: String,
          date:{
              type:Date,
              default:Date.now
          }
        },
      ],
      postDate:{
          type:Date,
          default:Date.now
      }
    },
  ],
});

userSchema.methods.createToken = async function () {
  try {
    const token = await jwt.sign(
      { id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12);
    next();
  }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
