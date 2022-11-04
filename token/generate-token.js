const JWT = require('jsonwebtoken');

const generateToken = (id) => {
  const U = id;
  const TOKEN = JWT.sign({ U }, process.env.privateKEY, {
    expiresIn: process.env.EXPIRATION,
  });

  const generatedToken = {
    accessToken: TOKEN,
    type: 'bearer',
    expiration: '86400',
  };

  return generatedToken;
};

module.exports = {
  generateToken,
};
