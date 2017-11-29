<template>
  <div style="width: 100%;" class="view-users-list">
    <div v-for="(user, index) in users" :key="index"
      class="f-paper user-item">
      <avatar :username="user.name"
        :customStyle="{ marginRight: '6px', fontSize: '28px' }"
        :backgroundColor="user.color"
        :size="32"
        :title="user.id"></avatar>

      <p class="f-text-ellipse"
        :style="{ color: user.color }"
        :title="user.name">{{ user.name }}</p>
    </div>

    <!-- if there is no user, show this hint block -->
    <div style="width: 100%" class="no-data"
      v-show="users.length === 0">
      No data</div>
  </div>
</template>

<script>
  export default {
    components: {
      Avatar: require('vue-avatar').default
    },

    props: {
      users: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .view-users-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;

    .user-item {
      height: 40px; width: calc(33% - 8px);
      margin: 4px;
      padding: 4px 6px;

      @media screen and (max-width: 960px) {
        width: calc(50% - 8px);
      }
      @media screen and (max-width: 672px) {
        width: calc(100% - 8px);
      }

      display: flex;
      align-items: center;

      p {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .no-data {
      font-size: 20px; font-weight: 500;
      color: var(--grey); text-align: center;
    }
  }
</style>
