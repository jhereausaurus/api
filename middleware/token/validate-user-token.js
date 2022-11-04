const JWT = require('jsonwebtoken');
const base64decode = require('base-64');

module.exports = async (request, response) => {
  try {
    const autHeader =
      request.headers['user-token'] ?? request.headers['authorization'];
    const token = autHeader && autHeader.split(' ')[1];
    const result = await JWT.verify(
      token,
      process.env.privateKEY,
      (err, res) => {
        if (err) return response.response('Invalid Token').code(403).takeover();

        const decodedToken = res.U;
        return base64decode.decode(decodedToken);
      }
    );

    return result;
  } catch (err) {
    return response.response('Something went wrong').code(500).takeover();
  }
};
