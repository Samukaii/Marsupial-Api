const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const SectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    }
});

SectionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Section', SectionSchema);
