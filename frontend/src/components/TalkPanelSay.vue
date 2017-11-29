<template>
  <div :class="$style.container">
    <avatar :username="user.name"
      :customStyle="{ marginRight: '16px', fontSize: '32px' }"
      :backgroundColor="user.color"
      :size="40"
      :title="user.id"></avatar>

    <div :class="$style.content">
      <!-- who -->
      <div :class="$style.header">
        <Username/>
        <span class="f-button revert small" title="Ctrl+Enter"
          @click="send">
          Send
        </span>
      </div>
      <!-- message content -->
      <textarea class="f-textarea f-scroll" :rows="3"
        v-model="message"
        placeholder="Hello! are you here?..."
        @keydown.ctrl.enter="send"/>
    </div>
  </div>
</template>

<script>
  import { sendMessage } from '@/socket'
  import user from '@/store/user'

  export default {
    components: {
      Username: require('@/components/TalkPanelUsername.vue').default,
      Avatar: require('vue-avatar').default
    },

    data: () => ({
      message: '',
      user
    }),

    methods: {
      send () {
        const _this = this

        if (this.message === '' || user.name === '') {
          // do nothing when there is no message
        } else {
          sendMessage(
            user.currentRoom,
            user.name,
            this.message,
            user.color
          ).then((data) => {
            // after the message is sent successfully
            _this.message = ''
          })
        }
      }
    }
  }
</script>

<style lang="scss" module>
  .container {
    min-height: 90px;
    width: 100%;

    padding: 7px 16px;
    display: flex;

    border-top: 2px solid var(--grey-light);

    .content {
      flex: 1;

      .header {
        height: 27px;

        display: flex;
        justify-content: space-between;
      }

      .body {
        font-size: 14px;
        word-break: break-all;
      }
    }
  }
</style>
