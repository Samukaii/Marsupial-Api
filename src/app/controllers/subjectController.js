const Subject = require('../models/subject');
const {to} = require('../../helpers/assyncronous');

module.exports = {
    async index(req, res) {
        const {page = 1, limit = 20} = req.query;
        const subject = await Subject.paginate({}, {page: page, limit: limit});
        return res.json(subject);
    },
    async show(req, res) {
        const subject = await Subject.findById(req.params.id);

        return res.json(subject);
    },
    async store(req, res) {
        const {title, knowledge} = req.body;
        if (!title || !knowledge)
            return res
                .status(400)
                .send({Error: 'Nem todos os campos obrigatórios foram fornecidos'});

        const [subject, error] = await to(Subject.create(req.body));
        if (error) res.status(400).send({Error: 'Erro ao adicionar matéria ' + error});
        return res.status(201).send(subject);
    },
    async update(req, res) {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(subject);
    },
    async destroy(req, res) {
        await Subject.findByIdAndRemove(req.params.id);

        return res.status(204).send();
    }
};
