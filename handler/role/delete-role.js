module.exports.handler = async (request, reply) => {
  try {
    const { roleService } = request;
    const roleId = request.params.roleId;

    const result = await roleService.deleteRole(roleId);

    if (!result)
      throw { message: 'Not Found', details: 'Role not found.', code: 404 };

    return reply.response().code(204);
  } catch (err) {
    let response = reply.response({
      message: `Internal Server Error`,
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
