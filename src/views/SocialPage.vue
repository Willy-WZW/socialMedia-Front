<script>
import UserInfo from '@/components/UserInfo.vue'
import Post from '@/components/Post.vue'
import AllPost from '@/components/AllPost.vue'
import PostWindow from '@/components/Comment.vue'
import { usePostStore } from "@/stores/postStore";

export default {
  data() {
    return {
      postStore: usePostStore(),
    }
  },
  methods: {
    logout() {
      this.$router.push('/')
    },
    quitWindow() {
      this.postStore.expendPost()
    },
    commentPost(item) {
      this.postStore.expendPost(item);  // 傳遞 item 並開啟視窗
    }
  },
  components: {
    UserInfo,
    Post,
    AllPost,
    PostWindow,
  },
  computed: {
    postWindow() {
      return this.postStore.postWindow;
    },
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

  <div class="filter" v-if="postWindow">
    <div class="filterBg" @click="quitWindow()"></div>
    <div class="postWindow">
      <PostWindow />
    </div>
  </div>
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

  .userNewPost {
    width: 96%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 3px solid gray;
  }

  .allPost {
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

.filter {
  width: 100%;
  height: 100dvh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  .filterBg {
    position: absolute;
    width: 100%;
    height: 100dvh;
    background: rgb(0, 0, 0, 0.3);
    backdrop-filter: blur(1px);
    top: 0;
    left: 0;
  }

  .postWindow {
    position: absolute;
    width: 60%;
    height: 90dvh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 1%;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0,1),
        0 0 10px rgba(0, 0, 0, 0.15),
        0 0 15px rgba(0, 0, 0, 0.1),
        0 0 20px rgba(0, 0, 0, 0.05);
  }
}
</style>