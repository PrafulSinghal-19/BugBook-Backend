const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bugSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref:'Comment'
    }],
    author: {
        type: String,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref:'Project'
    }
})


module.exports = mongoose.model('Bug', bugSchema);