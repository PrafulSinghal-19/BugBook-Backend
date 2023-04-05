const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    content: {
        type:String
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

module.exports = mongoose.model('Project', projectSchema);