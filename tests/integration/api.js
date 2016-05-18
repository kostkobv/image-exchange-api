const test = require('tape');
const app = require('../../app/main.js');
const request = require('supertest');

const before = test;
const after = test;

before('before', (assert) => {
  this.server = app.init();

  assert.pass('Test server is up');
  assert.end();
});

test('App should have a server', (assert) => {
  'use strict';

  request(this.server)
    .get('/')
    .expect(404)
    .end(function (err) {
      assert.error(err, 'No error');
      assert.end();
    });
});

test('App should have an ability to register', (assert) => {
  const data = {
    user: String(Date.now()),
    password: 'test'
  };

  request(this.server)
    .post('/register')
    .send(data)
    .expect(200)
    .end((err, res) => {
      assert.error(err, 'No errors');
      assert.equal(res.body.user, data.user);
      assert.end();
    });
});

after('after', (assert) => {
  this.server.close();

  assert.pass('Test server is down');
  assert.end();
});
