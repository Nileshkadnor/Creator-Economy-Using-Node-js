require("dotenv").config();

const twilio = require("twilio")(
  process.env.TWILIO_ID,
  process.env.TWILIO_TOKEN
);

const { Vonage } = require("@vonage/server-sdk");
const otpGenerator = require("otp-generator");
const vonage = new Vonage({
    apiKey: process.env.VONAGE_KEY,
    apiSecret: process.env.VONAGE_SECRET,
  });
const otpMessage = async (phone) => {
    const otp = otpGenerator.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
  try {
    phone = phone.toString();

    
    const message = await twilio.messages.create({
        from:process.env.TWILIO_NUMBER,
        to:`+91${phone}`,
        body:`Your Wendor OTP is ${otp}`
    });
    // console.log(message);
    return otp;
  } catch (error) {
    // console.log(error); 
   return otp;
  }
};

module.exports = otpMessage;
