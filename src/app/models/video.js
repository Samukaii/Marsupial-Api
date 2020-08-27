const mongoose = require("../../database");
const mongoosePaginate = require("mongoose-paginate");

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  linkVideo: {
    type: String,
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  description: {
    type: String,
  },
  youtubeChannel: {
    type: String,
    required: true,
  },
});

VideoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Video", VideoSchema);
