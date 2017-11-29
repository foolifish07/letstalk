<template>
  <div :class="$style.container">
    <button class="f-button revert" style="width: 100%;"
      title="Join a new room"
      @click="editable = true"
      v-show="!editable">
      <i class="fa fa-plus"></i>
    </button>
    <input type="text" class="f-input" placeholder="Join a new room"
      v-model="roomName" ref="input"
      maxlength="25"
      @blur="editable = false"
      @keydown.enter="joinRoom"
      v-show="editable">
  </div>
</template>

<script>
  import { joinRoom } from '@/store/rooms'
  import Vue from 'vue'

  export default {
    data: () => ({
      roomName: '',
      editable: false
    }),

    watch: {
      editable (newValue) {
        const _this = this
        if (newValue === true) {
          Vue.nextTick(() => {
            _this.$refs['input'].focus()
          })
        }
      }
    },

    methods: {
      joinRoom () {
        joinRoom(this.roomName)
        this.editable = false
        this.roomName = ''
      }
    }
  }
</script>

<style module>
  .container {
    height: 60px;
    padding: 12px 16px;
  }
</style>
