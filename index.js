const express = require("express");
const bodyParser = require("body-parser")
const axios = require("axios")
const cors = require("cors");
require('dotenv').config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const user = require("./routes/user");
const project = require("./routes/project");
const admin = require("./routes/admin");
const auth = require("./routes/auth");
const message = require("./routes/messages");
const { sockets } = require("./routes/socket");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");
const passport = require("passport");
var cookieParser=require('cookie-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/bugtracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => console.log("Database Connected")); 

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

const io = new Server(server, {
    cors: {
       origin:"http://localhost:3000" 
    }
});

app.use("/user",user);
app.use("/admin",admin);
app.use("/project", project);
app.use("/auth", auth);
app.use("/message", message);

sockets(io);

server.listen(8000, () => console.log("The server is up and running"));