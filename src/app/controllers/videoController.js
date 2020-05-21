const Video = require('../models/video');

module.exports = {
  async index(req, res) {
    const {page = 1, limit = 20} = req.query;
    const video = await Video.paginate({}, {page: page, limit: limit});

    return res.json(video);
  },
  async show(req, res) {
    const video = await Video.findById(req.params.id);

    return res.json(video);
  },
  async store(req, res) {
    const video = await Video.create(req.body);

    return res.json(video);
  },
  async update(req, res) {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true});

    return res.json(video);
  },
  async destroy(req, res) {
    await Video.findByIdAndRemove(req.params.id);

    return res.send();
  },
};
