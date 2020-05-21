const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

LessonSchema.plugin(mongoosePaginate);

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
