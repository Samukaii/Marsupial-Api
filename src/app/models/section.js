const mongoose = require("../../database");
const mongoosePaginate = require("mongoose-paginate");
const validSubjects = require("../../config/validSubjects.json");
const { compose } = require("../../helpers/compositions");
const {
    removeAccents,
    toInitialUpperCase
} = require("../../helpers/convertions");

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
        type: String,
        required: true
    }
});

SectionSchema.plugin(mongoosePaginate);

SectionSchema.pre("save", function(next) {
    if (this.isNew || this.isModified) {
        const cleanText = compose(removeAccents, toInitialUpperCase);
        console.log(this.subject);
        this.subject = cleanText(this.subject);
        next();
    }
});

SectionSchema.statics.validateSubject = function(subject) {
    const cleannedSubject = compose(removeAccents, toInitialUpperCase)(subject);
    return validSubjects.some(validSubject => cleannedSubject === validSubject);
};

module.exports = mongoose.model("Section", SectionSchema);
