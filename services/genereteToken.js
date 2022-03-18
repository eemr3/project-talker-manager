const crypto = require('crypto');

const genereteToken = () => crypto.randomBytes(8).toString('hex');

module.exports = genereteToken;