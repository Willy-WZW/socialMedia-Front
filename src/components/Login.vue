<script>
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {

        }
    },
    methods: {
        goSignIn() {
            this.$router.push("./signInPage")
        },
    },
}
</script>

<template>
    <div class="loginBox">
        <h1>登入帳號</h1>
        <div class="signIn">
            <span>第一次登入&nbsp>>&nbsp</span>
            <RouterLink to="/signInPage">註冊</RouterLink>
        </div>
        <div class="phoneNum">
            <h3>電話號碼</h3>
            <input type="text" placeholder="請輸入電話號碼">
        </div>
        <div class="password">
            <h3>密碼</h3>
            <input type="password" placeholder="請輸入密碼">
        </div>
        <button class="loginBTN">登入</button>
    </div>
</template>

<style scoped lang="scss">
.loginBox {
    width: 100%;
    height: 55dvh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;

    .signIn {
        width: 100%;
        font-size: 18px;
        letter-spacing: 2px;
        display: flex;
        justify-content: center;
    }

    .phoneNum,
    .password {
        width: 60%;
        letter-spacing: 2px;

        h3 {
            margin: 2% 0;
        }

        input {
            width: 100%;
            font-size: 20px;
            padding: 3%;
            background-color: rgba(147, 147, 147, 0.3);
            border: none;
            border-radius: 5px;
        }
    }

    .loginBTN {
        width: 60%;
        margin-top: 3%;
        color: white;
        background-color: black;
        font-size: 20px;
        border-radius: 5px;
    }

}
</style>