class AuthRequest {
  constructor() {}

  static get rules() {
    return {
      email: {
        required: true,
        type: 'string',
        maxLength: 255,
      },
      password: {
        required: true,
        type: 'string',
        maxLength: 255,
      },
    };
  }
}

module.exports = AuthRequest;
