const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const SubjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  knowledge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Knowledge',
    required: true,
  },
});

SubjectSchema.plugin(mongoosePaginate);

const Subject = mongoose.model('Subject', SubjectSchema);

module.exports = Subject;
