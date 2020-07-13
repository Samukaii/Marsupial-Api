const Lesson = require("../models/lesson");
const { to } = require("../../helpers/assyncronous");
const { unknownErrors, notProvideds } = require("../../config/errors");

module.exports = {
    async index(req, res) {
        const { page = 1, limit = 20 } = req.query;
        const lesson = await Lesson.paginate({}, { page: page, limit: limit });
        return res.json(lesson);
    },
    async show(req, res) {
        const lesson = await Lesson.findById(req.params.id);

        return res.json(lesson);
    },
    async store(req, res) {
        const { title, section } = req.body;
        if (!title) return res.status(400).send(notProvideds.titleNotProvided);
        if (!section)
            return res.status(400).send(notProvideds.sectionNotProvided);

        const [lesson, error] = await to(Lesson.create(req.body));
        if (error)
            res.status(400).send({
                error: "Erro ao adicionar aula " + error,
                code: unknownErrors.unknownCreateLessonErrorCode
            });
        return res.status(201).send(lesson);
    },
    async update(req, res) {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        return res.json(lesson);
    },
    async destroy(req, res) {
        await Lesson.findByIdAndRemove(req.params.id);

        return res.status(204).send();
    }
};
