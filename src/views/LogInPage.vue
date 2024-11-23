<script>
import Login from '@/components/Login.vue'
export default {
  data() {
    return {

    }
  },
  methods: {
    temporaryBTN() {
      this.$router.push("./socialPage")
    },
  },
  components:{
    Login
  }
}
</script>

<template>
  {{ "這邊做登入頁面" }}
  <button @click="temporaryBTN()">社群頁面</button>
  <div class="loginArea">
    <Login />
  </div>
</template>

<style scoped lang="scss">
.loginArea {
  width: 25%;
}
</style>