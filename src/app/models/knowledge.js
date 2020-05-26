const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const KnowledgeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

KnowledgeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Knowledge', KnowledgeSchema);
