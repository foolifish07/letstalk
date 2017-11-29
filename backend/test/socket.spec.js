const Koa = require('koa');
const server = require('../socket')(new Koa());
const client = require('socket.io-client');
const assert = require('assert');

describe('socket.io:', () => {

  let client1 = null, client2 = null;

  before(() => {
    server.listen(33333);
    client1 = client.connect('http://0.0.0.0:33333');
    client2 = client.connect('http://0.0.0.0:33333');
  })

  it('"client1" login', (done) => {
    client1.emit('login', { name: 'client1', color: 'black' }, (error) => {
      if (!error) {
        done()
      }
    });
  });

  it('"client1" join room "room1"', (done) => {
    client1.emit('room_join', 'room1', () => {
      done();
    });
  });

  it('"client1" should be in "room1"', (done) => {
    client1.emit('room_info', 'room1', (users) => {
      try {
        assert.equal(users.length, 1);
        done();
      } catch (e) {
        done(e);
      }
    })
  })

  it('"client2" login && join "room1", "client1" will know it', (done) => {
    client2.emit('login', { name: 'client2', color: 'black' });
    client2.emit('room_join', 'room1');

    client1.on('users', (data) => {
      try {
        const { roomName, num } = data;
        assert.equal(num, 2);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('"client2" send a message in "room1", "client1" should receive it', (done) => {
    client2.emit('message', {
      roomName: 'room1',
      username: 'client1',
      content: 'I love you',
      color: 'black'
    });

    client1.on('messages', (data) => {
      try {
        done();
      } catch(e) {
        done(e);
      }
    });
  });

  it('"client2" send some invalid message in "room1", "client1" should not receive it', (done) => {
    client2.emit('message', {
      roomName: 'room1'
    });

    client1.on('messages', (data) => {
      done('should not receive it');
    })

    setTimeout(done, 1500);
  });

  it('"client2" leave "room1", "client1" will know it', (done) => {
    client2.emit('room_leave', 'room1');

    client1.on('users', (data) => {
      try {
        const { roomName, num } = data;
        assert.equal(num, 1);
        done();
      } catch (e) {
        done(e);
      }
    })
  });

  afterEach(() => {
    client1.removeAllListeners();
    client2.removeAllListeners();
  })

  after(() => {
    client1.close();
    client2.close();
    server.close();
  })
})
