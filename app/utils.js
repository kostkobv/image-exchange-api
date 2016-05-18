const bcrypt = require('bcrypt');

const USER_PREFIX = 'user:';

/**
 * Generates password hash
 *
 * @param password - plain password
 * @returns {Promise}
 */
function generateUserPasswordHash(password) {
  return new Promise((resolve) => {
    const hash = bcrypt.hashSync(password, 10);

    resolve(hash);
  });
}

/**
 * Checks if password matches the provided hash
 *
 * @param password - password to be checked
 * @param hash - hash
 * @returns {{Boolean}}
 */
function matchPasswords(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  USER_PREFIX,
  generateUserPasswordHash,
  matchPasswords
};