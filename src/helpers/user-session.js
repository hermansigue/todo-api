const { UnauthorizedException } = require('./exception');

function getLoggedUser(req) {
  const { user } = req || {}; 
  if (!user) {
    throw new UnauthorizedException('User invalid!');
    
  }    
  return user;
}

module.exports = getLoggedUser;
