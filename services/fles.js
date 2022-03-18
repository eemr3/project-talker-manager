const fs = require('fs');

const readeFiles = (file) => {
  try {
    const resultReadFile = fs.readFileSync(file, 'utf8');
    return JSON.parse(resultReadFile);
  } catch (error) {
    console.log(error);
  }
};

const createFiles = (file, text) => {
  try {
    return fs.writeFileSync(file, JSON.stringify(text));
  } catch (error) {
    console.log(error);
  }
};

module.exports = { readeFiles, createFiles };