const fs = require('fs');

const readeFiles = (file) => {
  const resultReadFile = fs.readFileSync(file, 'utf8');
  return JSON.parse(resultReadFile);
};

module.exports = { readeFiles };