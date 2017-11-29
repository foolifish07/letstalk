import io from 'socket.io-client'
import user from '@/store/user'

/**
 *
 * Actions
 *
 */

export const login = (username, color = '#75bbb4') => (new Promise((resolve, reject) => {
  socket.emit('login', { name: username, color }, (res) => {
    resolve(res)
  })
}))

export const joinRoom = (roomName) => (new Promise((resolve, reject) => {
  socket.emit('room_join', roomName, (res) => {
    resolve(res)
  })
}))

export const leaveRoom = (roomName) => (new Promise((resolve, reject) => {
  socket.emit('room_leave', roomName, (res) => {
    resolve(res)
  })
}))

export const fetchRoomInfo = (roomName = '') => (new Promise((resolve, reject) => {
  socket.emit('room_info', roomName, (users) => {
    resolve(users)
  })
}))

export const sendMessage = (roomName, username, content, color = '#26A69A') =>
  (new Promise((resolve, reject) => {
    socket.emit('message', {
      roomName, username, content, color
    }, (res) => {
      resolve(res)
    })
  }))



/**
 *
 * socket
 *
 */

let socket = null

export const connect = () => {
  if (process.env.NODE_ENV === 'production') {
    socket = io(`http://${window.location.hostname}:${window.location.port}`)
  } else {
    socket = io(`http://${window.location.hostname}:3000`)
  }


  socket.on('connect', () => {
    console.log('connect ' + socket.id)
    user.id = socket.id
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
  })

  return socket
}

socket = connect()

export default socket
