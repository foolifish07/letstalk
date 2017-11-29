<template>
  <div :class="$style.container">
    <form class="box" :class="[$style.box]"
      @submit.prevent="letstalk">
      <h1 :class="$style.title">Enter your name</h1>
      <input type="text" class="f-input" style="text-align: center;"
        placeholder="your name" maxlength="25" required
        v-model="username">
      <button class="f-button">Let's talk</button>
    </form>
  </div>
</template>

<script>
  import { joinRoom } from '@/store/rooms'
  import user from '@/store/user'
  import { login } from '@/socket'

  export default {
    data: () => ({
      username: '',
      user
    }),

    methods: {
      letstalk () {
        const _this = this

        login(this.username, '#75bbb4').then(() => {
          user.name = this.username
          user.color = '#75bbb4'
          // join earth as default
          joinRoom('earth')
          // go to main page
          _this.$router.push({ name: 'chat' })
          // clean input
          _this.username = ''
        })
      }
    }
  }
</script>

<style lang="scss" module>
  .container {
    height: 100%; width: 100%;
    background-color: var(--primary-grey-light);

    display: flex;
    justify-content: center; align-items: center;

    .box {
      width: 360px; height: 210px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .title {
      font-size: 24px;
      font-weight: 500;
      text-align: center;
    }
  }
</style>
