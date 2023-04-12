const Message = require("../models/messages");

module.exports.addMessage = async(req, res) => {
    const bugId = req.query.id;
    const newMessage = new Message({
        bugId: bugId,
        senderId: req.user._id,
        text: req.body.text
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports.getMessages = async (req, res) => {
    const bugId = req.query.id;
    try {
        const messages = await Message.find({ bugId: bugId });
        res.status(200).json(messages);
    }
    catch (err) {
        res.status(500).json(err);
    }
}