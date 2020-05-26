const Knowledge = require('../models/knowledge');
const {to} = require('../../helpers/assyncronous');

module.exports = {
    async index(req, res) {
        const {page = 1, limit = 20} = req.query;
        const knowledge = await Knowledge.paginate({}, {page: page, limit: limit});
        return res.json(knowledge);
    },
    async show(req, res) {
        const knowledge = await Knowledge.findById(req.params.id);

        return res.json(knowledge);
    },
    async store(req, res) {
        const {title} = req.body;
        if (!title)
            return res
                .status(400)
                .send({Error: 'Nem todos os campos obrigatórios foram fornecidos'});

        const [knowledge, error] = await to(Knowledge.create(req.body));
        if (error) res.status(400).send({Error: 'Erro ao adicionar área do conhecimento ' + error});
        return res.status(201).send(knowledge);
    },
    async update(req, res) {
        const knowledge = await Knowledge.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(knowledge);
    },
    async destroy(req, res) {
        await Knowledge.findByIdAndRemove(req.params.id);

        return res.status(204).send();
    }
};
