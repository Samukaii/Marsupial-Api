const Knowledge = require('../models/knowledge');

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
    const knowledge = await Knowledge.create(req.body);

    return res.json(knowledge);
  },
  async update(req, res) {
    const knowledge = await Knowledge.findByIdAndUpdate(req.params.id, req.body, {new: true});

    return res.json(knowledge);
  },
  async destroy(req, res) {
    await Knowledge.findByIdAndRemove(req.params.id);

    return res.send();
  },
};
