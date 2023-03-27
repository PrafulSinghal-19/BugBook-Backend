const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref:'Project'
    }],
    image: {
        url:String,
    }
})

const autoPopulateProjects = function (next) {
    this.populate('projects'); //This should be same as the name given in schema 
    next();
}

userSchema.pre('findOne', autoPopulateProjects);

module.exports = mongoose.model('User', userSchema);