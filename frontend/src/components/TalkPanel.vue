<template>
  <div :class="$style.container">
    <!-- Messages -->
    <div class="f-scroll" :class="$style.messageList" ref="messageList"
      v-if="isInSomeRoom">
      <Message v-for="(message, index) in messages" :key="index"
        :username="message.username"
        :content="message.content"
        :timestamp="message.timestamp"
        :color="message.color"/>
    </div>
    <!-- Messages -->

    <Say v-if="isInSomeRoom"/>

    <div v-if="!isInSomeRoom" :class="$style.emptyPage">
      Please select a room.
    </div>
  </div>
</template>

<script>
  import user from '@/store/user'
  import { findRoom } from '@/store/rooms'

  export default {
    components: {
      Message: require('@/components/TalkPanelMessage.vue').default,
      Say: require('@/components/TalkPanelSay.vue').default
    },

    computed: {
      messages () {
        const room = findRoom(user.currentRoom)
        if (room && Array.isArray(room.messages)) {
          return room.messages
        } else {
          return []
        }
      },
      isInSomeRoom () {
        return !(user.currentRoom === '')
      }
    },

    watch: {
      // when there is a new message, scroll to the bottom
      messages (newMessages) {
        const messageList = this.$refs['messageList']
        const lastMessage = newMessages[newMessages.length - 1]
        const _this = this

        const isMyMessage = (message, myname) => {
          if (message && message.username === myname) {
            return true
          } else {
            return false
          }
        }

        const doScrollToBottom = () => {
          _this.$nextTick(() => {
            scrollToBottom(messageList)
          })
        }

        if (messageList) {
          if (isMyMessage(lastMessage, user.name)) {
            doScrollToBottom()
          } else if (isAtTheBottom(messageList)) {
            doScrollToBottom()
          }
        }
      }
    }
  }


  const isAtTheBottom = (dom) =>
    (dom.scrollTop + dom.clientHeight) === dom.scrollHeight

  const scrollToBottom = (dom) => {
    try {
      dom.scrollTop = dom.scrollHeight
    } catch (e) {
      // do nothing
    }
  }
</script>

<style lang="scss" module>
  .container {
    height: 100%; width: 100%;

    display: flex;
    flex-direction: column;

    .messageList {
      flex: 1;
    }

    .emptyPage {
      width: 100%; height: 100%;

      padding: 220px 0 0 0;
      text-align: center;
      font-size: 30px;
      font-weight: 900;

      color: var(--grey);
    }
  }
</style>
