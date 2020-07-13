require("dotenv/config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
    loginErrors,
    registerErrors,
    unknownErrors,
    notProvideds
} = require("../../config/errors.js");
const secret = process.env.APP_SECRET;

async function register(req, res) {
    const { email, name, password } = req.body;

    if (!name) return res.status(400).send(notProvideds.nameNotProvided);
    if (!email) return res.status(400).send(notProvideds.emailNotProvided);
    if (!password)
        return res.status(400).send(notProvideds.passwordNotProvided);

    try {
        if (await User.findOne({ email }))
            return res.status(400).send(registerErrors.alreadyRegisteredUser);
        const user = await User.create(req.body);
        user.password = undefined;
        return res.status(201).send({ user });
    } catch (error) {
        return res.status(500).send({
            error: "Erro ao realizar o cadastro: " + error,
            code: unknownErrors.unknownRegisterErrorCode
        });
    }
}

async function login(req, res) {
    let { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.status(400).send(loginErrors.nonExistentEmail);
        } else {
            user.checkPassword(password, function(err, isCorrectPassword) {
                if (!isCorrectPassword)
                    res.status(400).send(loginErrors.IncorrectPassword);
                else {
                    const token = jwt.sign({ email }, secret, {
                        expiresIn: "1d"
                    });
                    res.json({ user: user, token: token });
                }
            });
        }
    } catch (err) {
        return res.status(500).send({
            error: "Erro ao realizar o login: " + err,
            code: unknownErrors.unknownLoginErrorCode
        });
    }
}

module.exports = {
    register,
    login
};
