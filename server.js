require('dotenv').config();
const express = require("express");
const app = express()
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION_URL)

const db = mongoose.connection

db.on("error", (error) => console.error(error))
db.once("open", () => console.log("connected to mongo db"))


app.use(cors({
    origin: process.env.ALLOW_ORIGIN
}))
app.use(express.json())

const templateRouter = require("./routes/templates")
app.use("/templates", templateRouter)

app.listen(3000, () => console.log("Server Started on 3000"))   