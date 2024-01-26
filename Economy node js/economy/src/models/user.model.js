const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
  
    phone_number: { type: Number, required: true, unique: true },
  },
  {
    timestamps: true,
    versionKey:false
  }
);

module.exports = new mongoose.model("user",userSchema);