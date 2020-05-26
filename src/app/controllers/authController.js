const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../../config/auth.json').secret;

async function register(req, res) {
    const {email} = req.body;

    try {
        if (await User.findOne({email}))
            return res.status(400).send({error: 'Usuário já cadastrado'});
        const user = await User.create(req.body);
        user.password = undefined;
        return res.status(201).send({user});
    } catch (error) {
        return res.status(500).send({error: 'Erro ao realizar o cadastro: ' + error});
    }
}

async function login(req, res) {
    let {email, password} = req.body;
    try {
        const user = await User.findOne({email}).select('+password');
        if (!user) {
            res.json('incorrect email or password');
        } else {
            user.checkPassword(password, function(err, same) {
                if (!same) res.json('incorrect email or password');
                else {
                    const token = jwt.sign({email}, secret, {expiresIn: '30d'});
                    res.json({user: user, token: token});
                }
            });
        }
    } catch (err) {
        return res.status(500).send({error: 'Erro ao realizar o login: ' + err});
    }
}

module.exports = {
    register,
    login
};
