const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const SectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SectionSchema.plugin(mongoosePaginate);

const Section = mongoose.model('Section', SectionSchema);

module.exports = Section;
