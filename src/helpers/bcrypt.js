const bcrypt = require('bcryptjs');
const saltRounds = Math.ceil(Math.random() * 15);

exports.encrypt = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

exports.isCompare = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
