const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bugSchema = new Schema({
    title: {
        type: String,
        required:true
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
        required:true
    }
})

const autoPopulateComments = function (next) {
    this.populate('comments'); //This should be same as the name given in schema 
    next();
}

userSchema.pre('findOne', autoPopulateComments);

module.exports = mongoose.model('Bug', bugSchema);