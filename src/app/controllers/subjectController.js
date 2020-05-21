const Subject = require('../models/subject');

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
    const subject = await Subject.create(req.body);

    return res.json(subject);
  },
  async update(req, res) {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {new: true});

    return res.json(subject);
  },
  async destroy(req, res) {
    await Subject.findByIdAndRemove(req.params.id);

    return res.send();
  },
};
