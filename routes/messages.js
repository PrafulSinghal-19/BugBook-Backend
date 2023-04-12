const route = require("express").Router();
const message = require("../controllers/messages");

//new Message

route.post("/", message.addMessage);

//get Messages

route.get("/", message.getMessages);

module.exports = route;

