const { decryptToken } = require('@helpers/jwt');
const { UnauthorizedException } = require('@helpers/exception');

exports.authenticated = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const [bearer, token] = authorization.split(' ');
    if (!bearer || bearer !== 'Bearer' || !token) {
      return next(new UnauthorizedException('Token not prohibited'));
    }
    const user = decryptToken(token);
    if (!user) {
      return next(new UnauthorizedException('Invalid Token'));
    }

    req.user = user;
    next();
  } else {
    return next(new UnauthorizedException('Token Not Recognized'));
  }
};

