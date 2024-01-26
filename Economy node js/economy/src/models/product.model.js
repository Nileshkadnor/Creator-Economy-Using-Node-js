const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: 
      {
        type: String,
        default:
          "https://wendorin.b-cdn.net/wp-content/uploads/2020/01/web-logo.png",
      },
    
      
    price: { type: Number, required: true },
    description: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = new mongoose.model("product", productSchema);
