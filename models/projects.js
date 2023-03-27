const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref:'User'
    }],
    bugs: [{
        type: Schema.Types.ObjectId,
        ref:'Bug'
    }]
});

const autoPopulateBugsUsers = function (next){
    this.populate('users').populate('bugs');
    next();
}

projectSchema.pre('findOne', autoPopulateBugsUsers);

module.exports = mongoose.model('Project', projectSchema);