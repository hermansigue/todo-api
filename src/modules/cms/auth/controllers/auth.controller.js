const authService = require('../services/auth.service');
const AuthRequest = require('./requests/auth.request');
const getLoggedUser = require('@helpers/user-session');
const validateRequest = require('@helpers/request-validator');
const AuthRegisterRequest = require('./requests/register.request');

class AuthController {
  async login(req) {
    const dto = validateRequest(AuthRequest, req.body);
    return authService.login(dto);
  }

  async register(req) {
    const dto = validateRequest(AuthRegisterRequest, req.body);
    return authService.register(dto);
  }

  async loggedUser(req) {
    const admin = getLoggedUser(req);
    return {data: admin};
  }
}

module.exports = new AuthController();
