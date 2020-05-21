const Lesson = require('../models/lesson');

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
    const lesson = await Lesson.create(req.body);

    return res.json(lesson);
  },
  async update(req, res) {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {new: true});

    return res.json(lesson);
  },
  async destroy(req, res) {
    await Lesson.findByIdAndRemove(req.params.id);

    return res.send();
  },
};
