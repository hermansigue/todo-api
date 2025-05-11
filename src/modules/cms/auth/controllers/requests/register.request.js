class AuthRegisterRequest {
  constructor() {}

  static get rules() {
    return {
      email: {
        required: true,
        type: 'email',
      },
      name: {
        required: true,
        type: 'string',
        maxLength: 255,
      },
      password: {
        required: true,
        type: 'string',
        maxLength: 255,
      },
      confirmationPassword: {
        required: true,
        type: 'string',
        maxLength: 255,
      },
    };
  }
}

module.exports = AuthRegisterRequest;
