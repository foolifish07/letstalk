<template>
  <div style="position: relative; height: 0%; width: 100%;">
    <div style="position: absolute; width: 100%; max-height: 50vh;"
      class="f-paper" :class="$style.usersList"
      v-show="isDisplayed">
      <!-- search bar -->
      <div style="width: 100%; height: 50px;"
        :class="$style.searchBar">
        <i class="fa fa-search"/>
        <div style="flex: 1">
          <input type="text" class="f-input" placeholder="Search for some user"
            v-model="searchKeyword">
        </div>
        <i class="fa fa-close f-clickable" @click="isDisplayed = false"/>
      </div>

      <!-- user list -->
      <div style="max-height: calc(50vh - 50px); width: 100%"
        class="f-scroll"
        v-show="!isLoading">
        <ListView :users="filteredUsers"/>
      </div>

      <!-- display when the information is loading-->
      <div style="width: 100%; height: 100px;"
        :class="$style.isLoading"
        v-show="isLoading">
        <i class="fa fa-spinner fa-5x fa-spin"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { fetchRoomInfo } from '@/socket'
  import user from '@/store/user'

  export default {
    components: {
      ListView: require('@/components/TheUsersListView.vue').default
    },

    data: () => ({
      searchKeyword: '',
      users: ((type = Users) => [])(),
      isLoading: false,
      isDisplayed: false,
      user
    }),

    computed: {
      filteredUsers () {
        if (this.searchKeyword === '') {
          return this.users
        } else {
          return this.users.filter(filterByName(this.searchKeyword))
        }
      }
    },

    methods: {
      refresh () {
        const _this = this
        this.isLoading = true
        fetchRoomInfo(this.user.currentRoom).then((users) => {
          _this.users = users
          _this.isLoading = false
        })
      }
    },

    watch: {
      isDisplayed (newVal, oldVal) {
        // refresh everytime when this component is displayed
        if (newVal === true) {
          this.refresh()
        }
      }
    }
  }

  /**
   * Data structure
   */
  const User = {
    name: String,
    id: String
  }
  const Users = [User]


  /**
   * utils
   */
  const filterByName = (name) => (ele) => hasSubstr(name, ele.name)

  const hasSubstr = (subStr = '', str) => {
    try {
      subStr = subStr.toLowerCase()
      str = str.toLowerCase()

      let re = new RegExp(subStr)
      let res = str.search(re)

      if (res === -1) {
        return false
      } else {
        return true
      }
    } catch (e) {
      return false
    }
  }
</script>

<style lang="scss" module>
  .usersList {
    padding: 0px 5px 7px 16px;

    color: var(--primary);
    background-color: white;

    .searchBar {
      display: flex; align-items: center;

      i {
        width: 36px; height: 36px;
        padding: 4px;
        line-height: 28px;

        color: var(--primary);
        border-radius: 18px;

        font-size: 26px;
        text-align: center;
      }
    }

    .isLoading {
      display: flex; justify-content: center; align-items: center;
      color: var(--grey);
    }
  }
</style>
