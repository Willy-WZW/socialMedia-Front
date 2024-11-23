<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    temporaryBTN() {
      this.$router.push("./socialPage")
    },
  }
}
</script>

<template>
  {{ "這邊做登入頁面" }}
  <button @click="temporaryBTN()">社群頁面</button>
  <div class="signInArea">
    <h1>登入帳號</h1>
    <div class="signIn">
      <span>第一次登入>></span>
      <a href="">註冊</a>
    </div>
    <div class="phoneNum">
      <h3>電話號碼</h3>
      <input type="text" placeholder="請輸入電話號碼">
    </div>
    <div class="password">
      <h3>密碼</h3>
      <input type="password" placeholder="請輸入密碼">
    </div>
    <button>登入</button>
  </div>
</template>

<style scoped lang="scss">
.signInArea {
  width: 25%;
  height: 55dvh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;

  .signIn {}

  .phoneNum {}

  .password {}
}
</style>