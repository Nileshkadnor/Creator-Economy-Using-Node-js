const connect = require("./configs/db");

const express = require("express");
const app = express();
const userController = require("./controllers//user.controller")
const productController = require("./controllers/product.controller")
app.use(express.json())
const cors = require("cors");
app.use(cors());
app.use("/login",userController)
app.use("/products",productController)
const PORT = 8080 || process.env.PORT
app.listen(PORT, async()=>{
    try {
        connect();
        console.log(`Listening to port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})
