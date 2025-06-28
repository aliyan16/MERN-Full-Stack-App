const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  username: String,
  media: {
    fileId: mongoose.Schema.Types.ObjectId,
    fileName: String,
    contentType: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Story', StorySchema);
