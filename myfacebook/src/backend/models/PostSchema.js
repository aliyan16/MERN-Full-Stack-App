const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'RegisterAccount' }, // Reference to User model
    firstName: String,
    lastName: String,
    postvalue: String,
    media: {
        fileId: mongoose.Schema.Types.ObjectId,
        fileName: String,
        contentType: String
    },
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:'RegisterAccount'}],
    comments:[{
        userId:{type:mongoose.Schema.Types.ObjectId,ref:'RegisterAccount'},
        text:String,
        createdAt:{type:Date,default:Date.now}
    }],
    createdAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Newpost', PostSchema);