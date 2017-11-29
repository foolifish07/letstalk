<template>
  <div :class="$style.container">
    <strong class="f-text-ellipse"
      :class="[$style.username]" :style="[{ color: user.color }]">
      {{ user.name }}
    </strong>

    <div :class="$style.colorpicker"
      :style="[{ backgroundColor: user.color }]"
      title="choose your color"
      @click="$refs['color-input'].click()"></div>
    <input type="color" style="display: none;"
      ref="color-input" v-model="user.color">
  </div>
</template>

<script>
  import user from '@/store/user'
  import { login } from '@/socket'

  let timeouter = null

  const FIVE_SECONDS = 5 * 1000

  export default {
    data: () => ({
      user
    }),

    watch: {
      'user.color' (newVal) {
        const _this = this

        if (!timeouter) {
          timeouter = setTimeout(() => {
            login(_this.user.name, _this.user.color)
            timeouter = null
          }, FIVE_SECONDS)
        }
      }
    }
  }
</script>

<style lang="scss" module>
  .container {
    min-width: 100px;

    font-size: 12px;

    display: flex;
    align-items: center;

    .username {
      max-width: 250px;
      padding: 0;
    }

    /* color picker */
    .colorpicker {
      display: inline-block;
      height: 14px; width: 14px;
      margin: 2px 5px;

      background-color: var(--primary);
      border-radius: 50%;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
