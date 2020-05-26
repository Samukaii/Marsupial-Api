const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const SubjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  knowledge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Knowledge',
    required: true,
  },
});

SubjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Subject', SubjectSchema);
