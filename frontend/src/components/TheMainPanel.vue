<template>
  <div :class="$style.container">
    <!-- header -->
    <div style="height: 50px; width: 100%;" :class="$style.header">
      <h1 style="height: 100%; width: 30%; min-width: 200px;"
        :class="$style.headerLeft">
        Let's talk
      </h1>
      <div style="height: 100%; width: 70%">
        <TheRoomHeader/>
      </div>
    </div>

    <!-- body -->
    <div style="height: calc(100% - 50px); width: 100%;" :class="$style.body">
      <div style="height: 100%; width: 30%; min-width: 200px;">
        <TheRoomList/>
      </div>
      <div style="height: 100%; width: 70%;">
        <TalkPanel/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
      TheRoomList: require('@/components/TheRoomList.vue').default,
      TalkPanel: require('@/components/TalkPanel.vue').default,
      TheRoomHeader: require('@/components/TheRoomHeader.vue').default
    }
  }
</script>

<style lang="scss" module>
  .container {
    height: calc(100% - 10px); width: 1000px;
    background-color: white;
    box-shadow: 0 2px 3px grey;

    @media screen and (max-width: 1000px) {
      width: 100%;
    }

    display: flex;
    flex-direction: column;

    .header {
      color: white;
      background-color: var(--primary);

      display: flex;

      .headerLeft {
        padding: 7px 16px;
        line-height: 36px;
        font-size: 24px;
        font-weight: bold;
      }
    }

    .body {
      display: flex;
    }
  }
</style>
