<script>
import { RouterLink } from 'vue-router';
import { useCounterStore } from '@/stores/userStore';
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    data() {
        return {
            userPhone: "",
            userPassword: "",
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
        login() {
            // 檢查手機號碼格式與密碼是否填寫
            if (!this.userPhone || !/^09\d{8}$/.test(this.userPhone)) {
                Swal.fire({
                    title: "錯誤",
                    text: "請輸入正確的手機號碼",
                    icon: "error",
                    confirmButtonText: "好的",
                });
                return;
            }

            if (!this.userPassword) {
                Swal.fire({
                    title: "錯誤",
                    text: "請輸入密碼",
                    icon: "error",
                    confirmButtonText: "好的",
                });
                return;
            }
            axios.post("http://localhost:8080/user/login", {
                    phone: this.userPhone,
                    pwd: this.userPassword,
                })
                .then((response) => {
                    const { code, message, userInfo } = response.data;

                    if (code === 200) {
                        const userStore = useCounterStore();
                        userStore.setUserPhone(this.userPhone);
                        console.log(userStore.userPhone); //檢查
                        Swal.fire({
                            title: "成功",
                            text: "登入成功！",
                            icon: "success",
                            confirmButtonText: "好的",
                        }).then(() => {
                            this.$router.push("/socialPage");
                        });
                    } else {
                        Swal.fire({
                            title: "錯誤",
                            text: message,
                            icon: "error",
                            confirmButtonText: "好的",
                        });
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        title: "錯誤",
                        text: error.response?.data?.message || "伺服器發生錯誤，請稍後再試",
                        icon: "error",
                        confirmButtonText: "好的",
                    });
                });
        },
    },
}
</script>

<template>
    <div class="loginBox">
        <h1>登入帳號</h1>
        <div class="phoneNum">
            <h3>手機號碼</h3>
            <input type="text" v-model="userPhone" maxlength="10" pattern="09[0-9]{8}" @input="inputPhone"
                placeholder="請輸入手機號碼">
        </div>
        <div class="password">
            <h3>密碼</h3>
            <input type="password" v-model="userPassword" placeholder="請輸入密碼">
        </div>
        <button class="loginBTN" @click="login()">登入</button>
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