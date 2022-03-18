const express = require('express');
const bodyParser = require('body-parser');
const { readeFiles } = require('./services/fles');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
app.get('/talker', (req, res) => {
  const dataFile = readeFiles('./talker.json');
  if (dataFile.length > 0) return res.status(HTTP_OK_STATUS).json(dataFile);
  return res.status(HTTP_OK_STATUS).json([]);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
