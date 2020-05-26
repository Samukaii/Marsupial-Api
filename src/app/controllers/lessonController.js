const Lesson = require('../models/lesson');
const {to} = require('../../helpers/assyncronous');

module.exports = {
    async index(req, res) {
        const {page = 1, limit = 20} = req.query;
        const lesson = await Lesson.paginate({}, {page: page, limit: limit});
        return res.json(lesson);
    },
    async show(req, res) {
        const lesson = await Lesson.findById(req.params.id);

        return res.json(lesson);
    },
    async store(req, res) {
        const {title, section} = req.body;
        if (!title || !section)
            return res
                .status(400)
                .send({Error: 'Nem todos os campos obrigatórios foram fornecidos'});

        const [lesson, error] = await to(Lesson.create(req.body));
        if (error) res.status(400).send({Error: 'Erro ao adicionar aula ' + error});
        return res.status(201).send(lesson);
    },
    async update(req, res) {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(lesson);
    },
    async destroy(req, res) {
        await Lesson.findByIdAndRemove(req.params.id);

        return res.status(204).send();
    }
};
