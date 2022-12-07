const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
  User.find({})
  .populate("roles", "-__v")
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    // var authorities = [];

    // for(let i = 0; i < user.length; i++){
    //   for (let b = 0; b < user[i].roles.length; b++) {
    //     authorities.push("ROLE_" + user[i].roles[b].name.toUpperCase());
    //   }
    // }
    res.status(200).send({
      data: user
    });
  });
};
  
  exports.userBoard = (req, res) => {
    let token = req.headers["x-access-token"];
    let userid;
    jwt.verify(token, config.secret, (err, decoded) => {
      userid = decoded.id;
    });

    User.findOne({
      _id: userid
    })
    // .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      // var authorities = [];

      // for (let i = 0; i < user.roles.length; i++) {
      //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      // }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email
        // roles: authorities
      });
    });
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
