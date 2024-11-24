<script>
import UserInfo from '@/components/UserInfo.vue';
export default {
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$router.push('/')
    }
  },
  components: {
    UserInfo
  }
}
</script>

<template>
  <div class="userInfo">
    <UserInfo />
  </div>
  <div class="news"></div>

  <button class="logoutBTN" @click="logout()">登出</button>
</template>

<style scoped lang="scss">
.userInfo {
  width: 20%;
  height: 90dvh;
  padding: 1%;
  border-radius: 10px;
  border: 1px solid;
  position: fixed;
  top: 2%;
  left: 2%;
  background-color: white;
  box-shadow: -4px 4px 3px black;
}

.news {
  width: 60%;
  min-height: 100dvh;
  position: fixed;
  top: 2%;
  right: 16%;
  border: 1px solid black;
}

.logoutBTN {
  width: 10%;
  height: 5dvh;
  letter-spacing: 5px;
  color: white;
  background-color: black;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  bottom: 2%;
  right: 2%;
}
</style>