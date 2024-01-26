const express = require("express");
const Product = require("../models/product.model");

const authMiddleware = require("../middlewares/auth.middleware");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post(
  "",
  body("price").notEmpty().isNumeric().withMessage("price required"),
  body("description").notEmpty().withMessage("Description required"),
  
  authMiddleware,
  async (req, res) => {
    try {
      const product = await Product.create(req.body);
      return res.status(200).send({ product });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
);

router.delete(
    "/:id",
    
    
    authMiddleware,
    async (req, res) => {
      try {
        
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).send({ product });
      } catch (error) {
        return res.status(500).send(error.message);
      }
    }
  );

module.exports = router;
