const Section = require('../models/section');

module.exports = {
  async index(req, res) {
    const {page = 1, limit = 20} = req.query;
    const section = await Section.paginate({}, {page: page, limit: limit});

    return res.json(section);
  },
  async show(req, res) {
    const section = await Section.findById(req.params.id);

    return res.json(section);
  },
  async store(req, res) {
    const section = await Section.create(req.body);

    return res.json(section);
  },
  async update(req, res) {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {new: true});

    return res.json(section);
  },
  async destroy(req, res) {
    await Section.findByIdAndRemove(req.params.id);

    return res.send();
  },
};
