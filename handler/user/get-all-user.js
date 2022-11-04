module.exports.handler = async (request, reply) => {
  try {
    const { userService } = request;

    const result = await userService.getAllUsers();

    if (!result) throw { message: 'Operation Failed', details: '', code: 400 };
    return reply.response(result).code(201);
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
