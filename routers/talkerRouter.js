const express = require('express');
const validateAge = require('../middleware/validateAge');
const validateName = require('../middleware/validateName');
const validateTalk = require('../middleware/validateTalk');
const validateToken = require('../middleware/validateToken');
const { readeFiles, createFiles } = require('../services/fles');

const HTTP_OK_STATUS = 200;
const router = express.Router();

const NAME_FILE = './talker.json';

router.get('/', (req, res) => {
  const dataFile = readeFiles(NAME_FILE);
  if (dataFile.length > 0) return res.status(HTTP_OK_STATUS).json(dataFile);
  return res.status(HTTP_OK_STATUS).json([]);
});

router.get('/search', validateToken, (req, res) => { 
  const { searchTerm } = req.query;
  const dataFile = readeFiles(NAME_FILE);
  const result = dataFile.filter((item) => item.name.includes(searchTerm));
  if (!searchTerm) return res.status(200).json(dataFile);
  if (!result) return res.status(200).json([]);
  return res.status(200).json(result);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const dataFile = readeFiles(NAME_FILE);
  const result = dataFile.find((item) => item.id === Number(id));
  if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(result);
});

router.post('/', validateToken, validateName, validateAge, validateTalk, (req, res) => {
  const { name, age, talk, watchedAt, rate } = req.body;
  const talkers = readeFiles(NAME_FILE);
  talkers.push({ id: talkers.length + 1, name, age, talk, watchedAt, rate });
  createFiles(NAME_FILE, talkers);
  return res.status(201).json({ id: talkers.length, name, age, talk, watchedAt, rate });
});

router.put('/:id', validateToken, validateName, validateAge, validateTalk, (req, res) => {
  const dataFile = readeFiles(NAME_FILE);
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const result = dataFile.findIndex((item) => item.id === Number(id));
  dataFile[result] = { name, age, id: Number(id), talk };
  createFiles(NAME_FILE, dataFile);
  return res.status(200).json({ name, age, id: Number(id), talk });
});

router.delete('/:id', validateToken, (req, res) => {
  const { id } = req.params;
  const dataFile = readeFiles(NAME_FILE);
  const result = dataFile.filter((item) => item.id !== Number(id));
  createFiles(NAME_FILE, result);

  return res.status(204).end();
});

module.exports = router;