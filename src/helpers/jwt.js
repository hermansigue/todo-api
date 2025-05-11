const jwt = require('jsonwebtoken');
const hashCode = process.env.HASHJWT;

exports.generateToken = ({ id, email, name }) => {
  return jwt.sign({ id, email, name }, hashCode);
};

exports.decryptToken = (token) => {
  try {
    return jwt.verify(token, hashCode);
  } catch (err) {
    return null;
  }
};

/*
exports.decryptToken = (token) => {
    return jwt.verify(token, hashCode);
}
    */
