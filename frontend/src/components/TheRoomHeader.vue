<template>
  <div style="height: 100%; width: 100%;">
    <!-- search panel -->
    <div style="height: 0px; width: 100%">
      <TheUsersList ref="usersList"/>
    </div>

    <!-- main -->
    <div style="height: 100%; width: 100%;" :class="[$style.main]">
      <div :class="[$style.roomTitle]"
        @click="$refs['usersList'].isDisplayed = true">
        <p class="f-text-ellipse" :class="[$style.roomName]"
          :title="user.currentRoom">
          {{ user.currentRoom }}</p>
        <small :class="[$style.members]">
          {{ num !== undefined ? num + ' people' : '' }}
        </small>
      </div>

      <button class="f-button small" title="leave this room"
        @click="leaveRoom">leave</button>
    </div>
  </div>
</template>

<script>
  import user from '@/store/user'
  // import rooms from '@/store/rooms'
  import { leaveRoom, findRoom } from '@/store/rooms'

  export default {
    components: {
      TheUsersList: require('@/components/TheUsersList.vue').default
    },

    data: () => ({
      user
    }),

    computed: {
      num: () => {
        const room = findRoom(user.currentRoom)
        if (room) {
          return room.userNum
        } else {
          return null
        }
      }
    },

    methods: {
      leaveRoom () {
        leaveRoom(this.user.currentRoom).then(() => {
          user.currentRoom = ''
        })
      }
    }
  }
</script>

<style lang="scss" module>
  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .roomTitle {
      padding: 7px 9px;
      line-height: 36px;
      font-size: 18px;

      cursor: pointer;
      &:hover {
        background-color: var(--primary-dark);
      }

      display: flex;

      .roomName {
        max-width: 240px;
        margin-right: 10px;
      }

      .members {
        max-width: 100px;

        font-size: 12px;
        color: var(--grey-light);
      }
    }
  }
</style>
