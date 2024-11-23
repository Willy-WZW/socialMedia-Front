<script>
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {

        }
    },
    methods: {
        // 手機號碼輸入限制
        inputPhone(event) {
            const inputPhoneNum = event.target
            inputPhoneNum.value = inputPhoneNum.value.replace(/\D/g, '')
            if (!inputPhoneNum.value.startsWith('09')) {
                inputPhoneNum.value = '09';
            }
        },
    },
}
</script>

<template>
    <div class="loginBox">
        <h1>登入帳號</h1>
        
        <div class="phoneNum">
            <h3>手機號碼</h3>
            <input type="text" maxlength="10" pattern="09[0-9]{8}" @input="inputPhone" placeholder="請輸入手機號碼">
        </div>
        <div class="password">
            <h3>密碼</h3>
            <input type="password" placeholder="請輸入密碼">
        </div>
        <button class="loginBTN">登入</button>
        <div class="signIn">
            <span>第一次登入&nbsp>>&nbsp</span>
            <RouterLink to="/registerPage">註冊</RouterLink>
        </div>
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
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2),
        0 0 10px rgba(0, 0, 0, 0.15),
        0 0 15px rgba(0, 0, 0, 0.1),
        0 0 20px rgba(0, 0, 0, 0.05);

    .signIn {
        width: 80%;
        height: 5dvh;
        display: flex;
        align-items: center;
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
        height: 5dvh;
        letter-spacing: 5px;
        margin-top: 2%;
        color: white;
        background-color: black;
        font-size: 20px;
        border-radius: 5px;
        cursor: pointer;
    }

}
</style>