const express = require("express");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middlewares/user.middleware");
const otpMessage = require("../configs/message");
const Otp = require("../models/otp.model");
require("dotenv").config();
const router = express.Router();



router.post("", userMiddleware, async (req, res) => {
  try {
    const { phone_number } = req.body;
    const otp = await otpMessage(phone_number);

    const user = await User.findOne({ phone_number });
    const check_otp_user = await Otp.findOne({ user_id: user._id });
    if(check_otp_user){
        const update_otp = await Otp.findByIdAndUpdate(check_otp_user._id,{otp});
    }else{
        const create_otp = await Otp.create({ otp, user_id: user._id });
    }
   





    return res.status(200).send({ message:"Otp sent successfully", otp});
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/verify", userMiddleware, async (req, res) => {
    try {
      
      const { phone_number,otp } = req.body;
      
  
      const user = await User.findOne({ phone_number });
      const find_otp = await Otp.findOne({user_id:user._id})

      if(find_otp.otp==otp){
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        const update_otp = await Otp.findByIdAndUpdate(find_otp._id,{otp:null});
        return res.status(200).send({token});

      }
      return res.status(401).send({ message:"Invalid otp" });
      
  

  
      
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });

module.exports = router;
