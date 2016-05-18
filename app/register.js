const redis = require('redis');

const { generateUserPasswordHash, USER_PREFIX } = require('./utils');

/**
 * Checks if user with such name already registered
 *
 * @param name - username
 * @param redisClient - redis client instance
 * @returns
 */
function checkIfUserExists(name, redisClient) {
  return new Promise((resolve) => {
    redisClient.get(`${USER_PREFIX}${name}`, (err, res) => {
      resolve(Boolean(res));
    });
  });
}

/**
 * Registers user with provided name and password
 *
 * @param user - user name
 * @param password - password
 * @returns {Promise}
 */
function register({ user, password }) {
  if (!user) {
    return Promise.reject('User name is not provided');
  }

  if (!password) {
    return Promise.reject('Password should be provided and not be empty');
  }

  const redisClient = redis.createClient();

  return checkIfUserExists(user, redisClient).then((userExists) => {
    if (userExists) {
      redisClient.quit();
      return Promise.reject('User with such name already exists');
    }

    return generateUserPasswordHash(password).then((password) => {
      redisClient.set(`${USER_PREFIX}${user}`, password);
      redisClient.quit();

      return { user };
    });
  });
}

module.exports = register;