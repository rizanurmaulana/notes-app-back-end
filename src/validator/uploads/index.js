const InvariantError = require('../../exceptions/InvariantError');
const { imageHeadersSchema } = require('./schema');

const UploadsValidator = {
  validateImageHeaders: (headers) => {
    const validationResult = imageHeadersSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UploadsValidator;
