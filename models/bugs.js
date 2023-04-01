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
    }
})

const autoPopulateComments = function (next) {
    this.populate('comments'); //This should be same as the name given in schema 
    next();
}

bugSchema.pre('findOne', autoPopulateComments);

module.exports = mongoose.model('Bug', bugSchema);