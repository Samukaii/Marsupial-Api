const Section = require("../models/section");
const { to } = require("../../helpers/assyncronous");
const { compose } = require("../../helpers/compositions");
const { toInitialUpperCase, removeAccents } = require("../../helpers/convertions");
const {
    notProvideds,
    unknownErrors,
    sectionErrors
} = require("../../config/errors");

const castSubject = compose(toInitialUpperCase, removeAccents);

module.exports = {
    async index(req, res) {
        const { page = 1, limit = 20 } = req.query;
        let { subject } = req.query;

        if (subject)
            subject = castSubject(subject);

        const query = subject ? { subject } : {};

        const section = await Section.paginate(
            query,
            { page: page, limit: limit }
        );
        return res.json(section);
    },
    async show(req, res) {
        const section = await Section.findById(req.params.id);

        return res.json(section);
    },
    async store(req, res) {
        const { title, subject } = req.body;

        if (!title) return res.status(400).send(notProvideds.titleNotProvided);
        if (!subject)
            return res.status(400).send(notProvideds.subjectNotProvided);

        if (!Section.validateSubject(subject))
            return res.status(400).send(sectionErrors.invalidSubject);

        const [section, error] = await to(Section.create(req.body));
        if (error)
            res.status(400).send({
                error: "Erro ao adicionar Seção " + error,
                code: unknownErrors.unknownCreateSectionErrorCode
            });
        return res.status(201).send(section);
    },
    async update(req, res) {
        const section = await Section.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.json(section);
    },
    async destroy(req, res) {
        await Section.findByIdAndRemove(req.params.id);

        return res.status(204).send();
    }
};
