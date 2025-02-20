const express = require('express');
const users = require('../mocks/users');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();

const CREDENTIALS_ERR_MESSAGE = 'Usuário ou senha incorretos';
router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).send({ message: CREDENTIALS_ERR_MESSAGE });
  }
  const cipheredPassword = crypto.createHash('sha256').update(password).digest('hex');
  if (cipheredPassword !== user.password) {
    return res.status(401).send({ message: CREDENTIALS_ERR_MESSAGE });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, 'secret');
  await new Promise((res) => setTimeout(res, 2000));
  res.send({ token })
});

module.exports = router;
