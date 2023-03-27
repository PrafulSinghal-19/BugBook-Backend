const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    content: {
        type: String,
    },
    author: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Comment', commentSchema);