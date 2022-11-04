module.exports.handler = async (request, reply) => {
  try {
    const { userService, payload, token, base64encode } = request;

    const user = await userService.getUserByEmailAndPassword(payload);
    if (!user) {
      throw {
        message: 'Operation Failed',
        details: 'Invalid details',
        code: 401,
      };
    }
    const generateToken = token.generateToken(base64encode.encode(user.id));

    return reply.response(generateToken).code(200);
  } catch (err) {
    let response = reply.response({
      message: 'Internal Server Error',
      details: '',
    });
    if (err.code) {
      response = reply
        .response({ message: err.message, details: err.details })
        .code(err.code);
    }
    return response;
  }
};
