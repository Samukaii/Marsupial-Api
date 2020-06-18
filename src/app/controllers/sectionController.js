const Section = require('../models/section');
const { to } = require('../../helpers/assyncronous');

module.exports = {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;
    const section = await Section.paginate({}, { page: page, limit: limit });
    return res.json(section);
  },
  async show(req, res) {
    const section = await Section.findById(req.params.id);

    return res.json(section);
  },
  async store(req, res) {
    const { title, subject } = req.body;
    if (!title || !subject)
      return res
        .status(400)
        .send({ error: 'Nem todos os campos obrigatórios foram fornecidos' });

    if (!Section.validateSubject(subject)) return res
      .status(400)
      .send({ error: 'A matéria fornecida é inválida' });
      
    console.log('a');
    const [section, error] = await to(Section.create(req.body));
    if (error) res.status(400).send({ error: 'Erro ao adicionar Seção ' + error });
    return res.status(201).send(section);
  },
  async update(req, res) {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(section);
  },
  async destroy(req, res) {
    await Section.findByIdAndRemove(req.params.id);

    return res.status(204).send();
  }
};
