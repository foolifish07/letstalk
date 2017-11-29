import * as R from 'ramda'
import {
  joinRoom as pushJoin,
  leaveRoom as pushLeave,
  default as socket
} from '@/socket'

import user from './user'



/**
 *
 * store rooms info && messages
 *
 */

let rooms = ((type = Rooms) => [])()

export default rooms



/**
 *
 * methods && interfaces
 *
 */

export const joinRoom = (roomName) => {
  if (!isInRoom(roomName)) {
    // add the new room
    rooms.splice(0, 0, newRoom(roomName))
    // switch current room to the new room
    user.currentRoom = roomName
    pushJoin(roomName)
  }
}

export const leaveRoom = (roomName) => {
  return pushLeave(roomName).then(() => {
    // Remove the room from rooms
    for (let i in rooms) {
      let room = rooms[i]
      if (room.name === roomName) {
        rooms.splice(i, 1)
        break
      }
    }

    // set current Room
    if (rooms.length > 0) {
      user.currentRoom = rooms[0].name
    } else {
      user.currentRoom = ''
    }
  })
}

export const readMessages = (roomName) => {
  const room = findRoom(roomName)
  room.unread.num = 0
}

export const selectRoom = (roomName) => {
  readMessages(roomName)
  user.currentRoom = roomName
}

// utils
const by = (name) => (room) => room.name === name

// utils
const isInRoom = (roomName) => rooms.some(by(roomName))

// utils
export const findRoom = (roomName) => {
  const index = rooms.findIndex(by(roomName))
  if (index === -1) {
    return undefined
  } else {
    return rooms[index]
  }
}



/**
 *
 * listeners
 *
 */

socket.on('messages', (data) => {
  console.log('messages:', data)

  const room = findRoom(data.roomName)
  if (room) {
    // push messages
    room.messages.push(data)

    // record unread messages
    room.unread.latestMessage = R.clone(data)
    room.unread.num++
  }

  readMessages(user.currentRoom)
})

socket.on('users', (data) => {
  console.log('users:', data)

  const { roomName, num } = data
  try {
    findRoom(roomName).userNum = num
  } catch (e) {
    // do nothing
  }
})



/**
 *
 * Data structure
 *
 */

const Message = () => ({
  username: String,
  content: String,
  timestamp: String,
  color: String
})

const Room = () => ({
  name: String,
  userNum: Number,
  messages: [Message],
  unread: {
    latestMessage: Message,
    num: Number
  }
})

const Rooms = [Room]

// factory
const newRoom = (roomName = '') => ({
  name: roomName,
  userNum: 0,
  messages: [],
  unread: {
    latestMessage: {},
    num: 0
  }
})
