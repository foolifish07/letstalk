<template>
  <div class="app-container">
    <router-view/>
  </div>
</template>

<script>
  import user from '@/store/user'
  import { default as rooms, joinRoom } from '@/store/rooms'
  import { login } from '@/socket'

  export default {
    name: 'app',

    data: () => ({
      user, rooms
    }),

    watch: {
      user: {
        handler (newVal) {
          setLocalUser(newVal)
        },
        deep: true
      },
      'rooms.length': {
        handler (newVal) {
          setLocalRoomList(this.rooms.map(ele => ele.name))
        }
      }
    }
  }



  /**
   * localstorage
   */

  const setLocalUser = (user = {}) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  const setLocalRoomList = (roomList = []) => {
    localStorage.setItem('roomList', JSON.stringify(roomList))
  }

  const useLocalStorage = () => {
    let localUser = JSON.parse(localStorage.getItem('user'))
    let localRoomList = JSON.parse(localStorage.getItem('roomList'))

    if (localUser !== null) {
      Object.keys(user).forEach((p) => {
        user[p] = localUser[p]
      })
      login(user.name, user.color)
    }

    if (localRoomList !== null) {
      localRoomList.forEach((roomName) => {
        joinRoom(roomName)
      })
    }
  }

  useLocalStorage()
</script>

<style lang="scss">
  @import "./styles/_all.scss";

  html {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #dddddd;

    body {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    .app-container {
      height: 100%;
      width: 100%;
      overflow: hidden;

      display: flex;
      justify-content: center;
      align-content: center;
    }
  }
</style>
