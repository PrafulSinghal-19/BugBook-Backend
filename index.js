const express = require("express");
const bodyParser = require("body-parser")
const axios = require("axios")
const cors = require("cors");
require('dotenv').config();
const app = express();
const mongoose = require("mongoose");
const auth = require("./controllers/auth.js");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/bugtracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => console.log("Database Connected")); 

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.post("/fetchData", auth.github_oauth);

app.listen(8000, () => console.log("The server is up and running"));