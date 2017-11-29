<template>
  <div :class="$style.container">
    <!-- avatar -->
    <avatar :username="username"
      :customStyle="{ marginRight: '16px', fontSize: '32px' }"
      :backgroundColor="color"
      :size="40"></avatar>

    <div :class="$style.content">
      <!-- who -->
      <div :class="$style.header">
        <strong class="f-text-ellipse" :class="[$style.username]"
          :style="[{ color: color ? color : 'var(--primary-dark)' }]">
          {{ username }}</strong>
        <span :class="$style.time">{{ time }}</span>
      </div>
      <!-- message content -->
      <p :class="$style.body">{{ content }}</p>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    components: {
      Avatar: require('vue-avatar').default
    },

    props: {
      username: String,
      color: String,
      content: String,
      timestamp: String
    },

    computed: {
      time () {
        if (moment(this.timestamp).isValid()) {
          return moment(this.timestamp).format('YYYY-MM-DD hh:mm:ss a')
        } else {
          return moment(this.timestamp).format('YYYY-MM-DD hh:mm:ss a')
        }
      }
    }
  }
</script>

<style lang="scss" module>
  .container {
    width: 100%;
    min-height: 20px;

    padding: 7px 16px;
    display: flex;

    .content {
      flex: 1;

      .header {
        height: 18px;

        display: flex;
        justify-content: space-between;

        .username {
          font-size: 12px;
          max-width: 300px;
        }

        .time {
          color: lightgrey;
          font-size: 12px;
        }
      }

      .body {
        font-size: 16px;
        word-break: break-all;
        white-space: pre-wrap;
      }
    }
  }
</style>
