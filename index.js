const express = require('express');
const bodyParser = require('body-parser');
const { readeFiles } = require('./services/fles');
const { validateEmail, validatePassword } = require('./middleware/validateLogin');
const genereteToken = require('./services/genereteToken');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (req, res) => {
  const dataFile = readeFiles('./talker.json');
  if (dataFile.length > 0) return res.status(HTTP_OK_STATUS).json(dataFile);
  return res.status(HTTP_OK_STATUS).json([]);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const dataFile = readeFiles('./talker.json');
  const result = dataFile.find((item) => item.id === Number(id));
  if (!result) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(result);
});

app.post('/login', validateEmail, validatePassword, (req, res) => { 
  const token = genereteToken();
  res.status(200).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
