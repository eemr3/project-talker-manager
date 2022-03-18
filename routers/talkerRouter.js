const express = require('express');
const validateAge = require('../middleware/validateAge');
const validateName = require('../middleware/validateName');
const validateTalk = require('../middleware/validateTalk');
const validateTokne = require('../middleware/validateToken');
const { readeFiles, createFiles } = require('../services/fles');

const HTTP_OK_STATUS = 200;
const router = express.Router();

router.get('/', (req, res) => {
  const dataFile = readeFiles('./talker.json');
  if (dataFile.length > 0) return res.status(HTTP_OK_STATUS).json(dataFile);
  return res.status(HTTP_OK_STATUS).json([]);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const dataFile = readeFiles('./talker.json');
  const result = dataFile.find((item) => item.id === Number(id));
  if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(result);
});

router.post('/', validateTokne, validateName, validateAge, validateTalk, (req, res) => {
  const { name, age, talk, watchedAt, rate } = req.body;
  const talkers = readeFiles('./talker.json');
  talkers.push({ id: talkers.length + 1, name, age, talk, watchedAt, rate });
  createFiles('./talker.json', talkers);
  return res.status(201).json({ id: talkers.length, name, age, talk, watchedAt, rate });
});

module.exports = router;