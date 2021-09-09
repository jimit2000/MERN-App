const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
// const cors = require("cors");


// var corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
//connection
require("../db/conn");
// app.use(cors());


app.use(express.json());

//use cookies
app.use(cookieParser());


//user defined
const User = require("../model/users");

const Port = process.env.PORT || 5000;


//route middleware
app.use(require("../route/router"));

//middleware
const staticpath = path.join(__dirname,"../client/build");
console.log(staticpath);
if(process.env.NODE_ENV === "production"){
  app.use(express.static(staticpath));
}

//listen server
app.listen(Port, () => {
  console.log(`Server conntected port ${Port}`);
});
