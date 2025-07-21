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
    createdAt: { type: Date, default: Date.now } // Optional: add timestamp
});

module.exports = mongoose.model('Newpost', PostSchema);