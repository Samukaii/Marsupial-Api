const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();
const exec = express();
exec.use(express.json());
const bd = ['carlos', 'andre', 'karol'];

Router.get('/', (req, res) => {
  return res.json({bd});
});

Router.get('/user/:id', validUserExist, (req, res) => {
  const index = req.params.id;
  return res.json(bd[index]);
});

Router.post('/user', validPostUser, (req, res) => {
  const {name} = req.body;
  bd.push(name);

  return res.json({bd});
});

Router.put('/user/:id', validAlterUser, (req, res) => {
  const {id} = req.params;
  const {name} = req.body;

  bd[id] = name;

  return res.status(200).json({message: 'user alterado com sucesso'});
});

//Auth

function validUserExist(req, res, next) {
  if (!bd[req.params.id]) {
    return res.json({message: 'digite um id que existe '});
  }

  next();
}

function validPostUser(req, res, next) {
  if (bd[req.body.user]) {
    return res.json({message: 'nome de usuario ja existe, porfavor utilize outro'});
  }

  next();
}

function validAlterUser(req, res, next) {
  if (!req.body.user) {
    return res.json({message: 'porfavor insira um nome no campo'});
  }

  next();
}

module.exports = Router;
