const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt')


exports.signUp =   async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          status: "error",
          message: errors.array()[0].msg,
        });    }
      const user = await User.create(req.body);
    //   const token = getToken(user._id);
      res.status(201).json({
        status: "success",
        // token,
        user,
      });
    } catch (err) {
      res.json({
        err: "error"
      })
    }
    
  };

exports.login = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          status: "error",
          message: errors.array()[0].msg,
        });
      }
  
      const user = await User.findOne({ email: req.body.email }).select(
        "+password"
      );
      if (
        !user ||
        !(await user.verifyPassword(req.body.password, user.password))
      ) {
        res.status(401).json({
          status: "error",
          message: "Invalid email or password",
        });
      }
  
    //  const token = getToken(user._id);
      res.status(201).json({
        status: "login success",
    //  token,
        user,
      });
    } catch (err) {
      //TODO
      console.log("opps not working");
    }
  };
  exports.getAllUsers = (req, res)=>{

    User.find().exec((err,users)=>{
    
        if(err || !users){
    
            return res.status(400).json({error:"No users found"})
    
        }
    
        return res.status(200).json(users)
    
    })
    }

    exports.updateUser = async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({
            status: "error",
            message: errors.array()[0].msg,
          });
        }
        const user = await User.findByIdAndUpdate(req.params.firstName, req.body, {
          new: true,
        });
        if (!user) {
          res.status(404).json({
            status: "error",
            message: "user with this ID does not exist",
          });
        }
        res.status(200).json({
          status: "success",
          user,
        });
      } catch (err) {
        //TODO
      }
    };