const db = require('@model');
const { User } = require('@model');
const { UnauthorizedException, NotAcceptableException } = require('@helpers/exception');
const { isCompare } = require('@helpers/bcrypt');
const { generateToken } = require('@helpers/jwt');
const e = require('express');
const bcrypt = require('bcryptjs/dist/bcrypt');

class AuthService {
  async login(dto) {
    const { email, password } = dto;
    const instance = await User.findOne({
      where: { email },
      rejectOnEmpty: new UnauthorizedException('User invalid'),
    });
    if (!instance || !(await isCompare(password, instance.password))) {
      throw new UnauthorizedException('User Password invalid');
    }
    return {
      accessToken: generateToken(instance),
      user: {
        id: instance.id,
        name: instance.name,
        email: instance.email,
      },
    };
  }

  async register(dto) {
    const { email } = dto;
    const exist = await User.findOne({
      where: { email },
    });
    if(exist) throw new NotAcceptableException('Email already registered');
    if(dto.password !== dto.confirmationPassword) {
      throw new NotAcceptableException('Password and Confirm Password not match');
    }
    
    const user = await User.create({...dto, password: await bcrypt.hash(dto.password, 10)});
    return {
      accessToken: generateToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}

module.exports = new AuthService();
