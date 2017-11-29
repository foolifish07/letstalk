<template>
  <div style="height: 100%; min-width: 200px;" class="f-scroll nano">
    <ButtonAdd/>

    <div v-for="(room, index) in rooms" :key="room.name"
      style="height: 60px; width: 100%;" class="f-clickable"
      :class="[$style.item, isActiveRoom(room.name) ? $style.active : '']"
      @click="selectRoom(room.name)">
      <!-- room name -->
      <h6 class="f-text-ellipse" :class="[$style.itemTitle]"
        :title="room.name">
        <span>{{ room.name }}</span>
      </h6>

      <!-- last message -->
      <div :class="$style.itemContent">
        <span class="f-text-ellipse" :class="$style.text"
          v-show="room.messages.length > 0">
          {{ room.unread.latestMessage.username + ':' }}
          {{ room.unread.latestMessage.content }}
        </span>
        <span class="f-chip"
           v-show="room.unread.num > 0">{{ room.unread.num }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { default as rooms, selectRoom } from '@/store/rooms'
  import user from '@/store/user'

  export default {
    components: {
      ButtonAdd: require('@/components/TheRoomListButtonAdd.vue').default
    },

    data () {
      return {
        rooms
      }
    },

    methods: {
      selectRoom (room) {
        selectRoom(room)
      },
      isActiveRoom (roomName) {
        return user.currentRoom === roomName
      }
    }
  }
</script>

<style lang="scss" module>
  .item {
    padding: 7px 16px;
    line-height: 24px;

    &.active {
      color: white;
      background-color: var(--primary);
    }

    .itemTitle {
      font-size: 16px;
      font-weight: bold;
    }

    .itemContent {
      display: flex;

      .text {
        flex: 1;
        font-size: 12px;
      }
    }
  }
</style>
