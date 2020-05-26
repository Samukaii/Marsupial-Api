const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const LessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    }
});

LessonSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Lesson', LessonSchema);
