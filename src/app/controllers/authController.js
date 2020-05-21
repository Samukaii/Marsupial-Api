const authConfig = require('../../config/auth.json');
const Users = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

async function register(req, res) {
  const {email} = req.body;

  try {
    if (await Users.findOne({email})) return res.status(400).send({error: 'User already exists'});
    const user = await Users.create(req.body);
    user.password = undefined;

    return res.send({User: user, token: generateToken({id: user.id})});
  } catch (error) {
    return res.status(400).send({error: 'Registration failed: ' + error});
  }
}
async function authenticate(req, res) {
  const {email, password} = req.body;
  const user = await Users.findOne({email}).select('+password');

  if (!user) return res.status(400).send({error: 'User not found'});
  if (user.password != password) return res.status(400).send({error: 'invalid password'});

  user.password = undefined;

  res.send({user, token: generateToken({id: user.id})});
}
async function forgotPassword(req, res) {
  const {email} = req.body;

  try {
    const user = await Users.findOne({email});

    if (!user) return res.status(400).send({error: 'User not found'});

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await Users.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    return res.send({token, expires: now});
  } catch (error) {
    return res.status(400).send({error: 'Error on forgot password, try again: ' + error});
  }
}
async function resetPassword(req, res) {
  const {email, token, password} = req.body;

  try {
    const user = await Users.findOne({email}).select('+passwordResetToken passwordResetExpires');

    if (!user) return res.status(400).send({error: 'User not found'});

    if (token !== user.passwordResetToken) return res.status(400).send({error: 'Token invalid'});

    const now = new Date();

    if (now > user.passwordResetExpires)
      return res.status(400).send({error: 'Token expired, generate a new one'});

    user.password = password;

    await user.save();

    return res.send();
  } catch (error) {
    return res.status(400).send({error: 'Cannot reset password, try again'});
  }
}

module.exports = {
  register,
  authenticate,
  forgotPassword,
  resetPassword,
};
