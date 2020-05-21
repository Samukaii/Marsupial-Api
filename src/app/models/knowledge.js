const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const KnowledgeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

KnowledgeSchema.plugin(mongoosePaginate);

const Knowledge = mongoose.model('Knowledge', KnowledgeSchema);

module.exports = Knowledge;
