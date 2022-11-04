module.exports.handler = async (request, reply) => {
  try {
    const { userService } = request;
    const userId = request.params.userId;

    const result = await userService.deleteUser(userId);

    if (!result)
      throw { message: 'Not Found', details: 'User not found', code: 404 };

    return reply.response().code(204);
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
