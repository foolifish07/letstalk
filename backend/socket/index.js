let socket = require('socket.io');
let http = require('http');
let log = require('../logger').getLogger('socket')
const { isString, isObject, isFunction } = require('../utils');

module.exports = (app) => {
  let server = http.createServer(app.callback());
  let io = socket(server);



  /**
   * Push a message to all clients connected in some room
   */
  const pushMessage = (data) => {
    let { roomName, username, content, color } = data;

    const timestamp = new Date().toUTCString();

    if (!isString(username) ||
        !isString(content) ||
        !isString(roomName)) {
      return false;
    }

    io.in(roomName).emit('messages', {
      roomName, username, content, timestamp, color
    });
    return true;
  }

  /**
   * Inform all clients to update the number of the users in some room
   */
  const updateUsers = (roomName = '') => {
    try {
      const socketids = io.sockets.adapter.rooms[roomName].sockets;
      const num = Object.keys(socketids).length;

      io.in(roomName).emit('users', {
        roomName, num
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  const getAllUsersInRoom = (roomName) => {
    const socketids = io.sockets.adapter.rooms[roomName].sockets;
    const byName = (a, b) => {
      return a.name < b.name ? -1 : 1;
    }

    if (isObject(socketids)) {
      const users = [];

      for(let socketid in socketids) {
        const socket = io.sockets.connected[socketid];

        users.push({
          name: socket.username,
          id: socketid,
          color: socket.color
        })
      }

      return users.sort(byName);
    } else {
      return [];
    }
  }



  /**
   * Client actions
   */
  io.on('connection', (socket) => {
    socket.username = 'Guest' + parseInt(Math.random() * 10000);
    socket.color = 'black'

    socket.on('login', ({ name, color }, fn) => {
      log.info('on login:', name, color);

      try {
        if (isString(name) && isString(color)) {
          socket.username = name;
          socket.color = color;
          fn();
        } else {
          fn('invalid name');
        }
      } catch (e) {
        // do nothing
      }
    });

    socket.on('room_join', (roomName, fn) => {
      log.info('on room_join:', roomName);

      try {
        if (!isString(roomName)) {
          return;
        }
        socket.join(roomName);

        if (isFunction(fn)) {
          fn('')
        }

        updateUsers(roomName);
      } catch (e) {
        // do nothing
      }
    });

    socket.on('room_leave', (roomName, fn) => {
      log.info('on room_leave:', roomName);

      try {
        if (!isString(roomName)) {
          return;
        }
        socket.leave(roomName);

        if (isFunction(fn)) {
          fn('')
        }

        updateUsers(roomName);
      } catch(e) {
        // do nothing
      }
    });

    socket.on('room_info', (roomName, fn) => {
      log.info('on room_info:', roomName);

      try {
        const users = getAllUsersInRoom(roomName);
        fn(users)
      } catch (e) {
        // do nothing
      }
    });

    socket.on('message', (data, fn) => {
      log.info('on message:', data);

      try {
        data.username = socket.username;

        if (isFunction(fn)) {
          fn('')
        }

        pushMessage(data)
      } catch (e) {
        // do nothing
      }
    })
  });

  return server;
}
