<script>
import UserInfo from '@/components/UserInfo.vue';
import Post from '@/components/Post.vue'
import AllPost from '@/components/AllPost.vue'
export default {
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$router.push('/')
    },
  },
  components: {
    UserInfo,
    Post,
    AllPost,
  }
}
</script>

<template>
  <div class="userInfo">
    <UserInfo />
  </div>
  <div class="news">
    <div class="userNewPost">
      <Post />
    </div>
    <div class="allPost">
      <AllPost />
    </div>
  </div>

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
  height: 100dvh;
  overflow-y: scroll;
  scrollbar-width: none;
  border-radius: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 2%;
  right: 16%;
  background-color: white;
  box-shadow: -4px 4px 3px black;

  .userNewPost{
    width: 96%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 3px solid gray;
  }

  .allPost{
    width: 96%;
    flex-wrap: wrap;
    padding: 3%;
    display: flex;
    justify-content: start;
    align-items: start;
  }
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