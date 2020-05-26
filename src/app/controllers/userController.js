const User = require('../models/user');

module.exports = {
    async index(req, res) {
        const {page = 1, limit = 20} = req.query;
        const user = await User.paginate({}, {page: page, limit: limit});
        return res.json(user);
    },
    async show(req, res) {
        const user = await User.findById(req.params.id);

        return res.json(user);
    },
    async update(req, res) {
        const {email} = req.body;

        if (email)
            if (await User.findOne({email}))
                return res.status(400).send({Error: 'E-mail já cadastrado na base de dados'});
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.json(user);
    },
    async destroy(req, res) {
        await User.findByIdAndRemove(req.params.id);

        return res.status(204).send();
    }
};
