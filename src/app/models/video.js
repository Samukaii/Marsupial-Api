const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

VideoSchema.plugin(mongoosePaginate);

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
