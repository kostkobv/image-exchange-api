const test = require('tape');
const redis = require('redis');

const register = require('../../app/register');
const { USER_PREFIX } = require('../../app/utils');

test('Register should create new user in redis', (assert) => {
  const user = {
    user: `test_user_name${String(Date.now())}`,
    password: 'test_password'
  };

  register(user)
    .then(() => {
      const redisClient = redis.createClient();

      redisClient.get(`${USER_PREFIX}${user.user}`, (err, res) => {
        assert.error(err, 'Something wrong with redis');
        assert.ok(res);

        redisClient.quit();

        assert.end();
      });
    })
    .catch((err) => {
      assert.error(err, 'Cant register user');
      assert.end();
    });

  assert.test('No ability to register the same user twice', (assert) => {
    register(user)
      .then(
        (res) => {
          assert.error(res, 'User with already existed name created');
          assert.end();
        },
        (rejected) => {
          assert.equal(rejected, 'User with such name already exists');
          assert.end();
        }
      );
  });
});