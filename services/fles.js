const fs = require('fs');

const readeFiles = (file) => {
  try {
    const resultReadFile = fs.readFileSync(file);
    const data = JSON.parse(resultReadFile);
    return data;
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