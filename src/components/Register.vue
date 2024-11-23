<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    data() {
        return {
            userName: "",
            userPhone: "",
            userEmail: "",
            userPassword: "",
            confirmPassword: "",
            // 對應的欄位名稱與顯示訊息
            fields: [
                { key: "userName", label: "使用者名稱" },
                { key: "userPhone", label: "手機號碼" },
                { key: "userEmail", label: "電子郵件" },
                { key: "userPassword", label: "密碼" },
                { key: "confirmPassword", label: "確認密碼" },
            ],
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
        // 註冊帳號檢查
        createAccount() {
            // 檢查欄位是否未填寫
            for (const field of this.fields) {
                if (!this[field.key]) {
                    Swal.fire({
                        title: "錯誤",
                        text: `請輸入${field.label}`,
                        icon: "error",
                        confirmButtonText: "好的",
                    });
                    return;
                }
            }

            // 檢查手機號碼長度
            if (this.userPhone.length !== 10) {
                Swal.fire({
                    title: "錯誤",
                    text: "手機號碼輸入錯誤",
                    icon: "error",
                    confirmButtonText: "好的",
                });
                return;
            }

            // 檢查郵件格式
            if (!this.userEmail.includes("@") || !this.userEmail.includes(".com")) {
                Swal.fire({
                    title: "錯誤",
                    text: "請輸入有效的電子郵件(必須包含 @ 和 .com)",
                    icon: "error",
                    confirmButtonText: "好的",
                });
                return;
            }

            // 檢查密碼一致性
            if (this.userPassword !== this.confirmPassword) {
                Swal.fire({
                    title: "錯誤",
                    text: "密碼與確認密碼不一致",
                    icon: "error",
                    confirmButtonText: "好的",
                });
                return;
            }

            // 發送 POST 請求到後端
            axios.post('http://localhost:8080/user/create', {
                userPhone: this.userPhone,
                userEmail: this.userEmail,
                userPassword: this.userPassword,
                userName: this.userName
            })
                .then(response => {
                    if (response.data.code === 200) {
                        Swal.fire({
                            title: "成功",
                            text: "註冊成功！",
                            icon: "success",
                            confirmButtonText: "好的",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.$router.push("/");
                            }
                        });
                    }
                })
                .catch(error => {
                    // 如果發生錯誤，顯示錯誤訊息
                    Swal.fire({
                        title: "錯誤",
                        text: error.response.data.message || "註冊失敗，請稍後再試。",
                        icon: "error",
                        confirmButtonText: "好的",
                    });
                });
        },
    }
}
</script>

<template>
    <div class="registerBox">
        <h1>註冊帳號</h1>
        <div class="userName">
            <h3>使用者名稱</h3>
            <input type="text" v-model="userName" placeholder="請輸入使用者名稱">
        </div>
        <div class="userPhone">
            <h3>手機號碼</h3>
            <input type="text" v-model="userPhone" maxlength="10" pattern="09[0-9]{8}" @input="inputPhone"
                placeholder="請輸入手機號碼">
        </div>
        <div class="userEmail">
            <h3>電子郵件</h3>
            <input type="text" v-model="userEmail" placeholder="請輸入電子郵件">
        </div>
        <div class="userPassword">
            <h3>密碼</h3>
            <input type="password" v-model="userPassword" placeholder="請輸入密碼">
        </div>
        <div class="passwordAgain">
            <h3>確認密碼</h3>
            <input type="password" v-model="confirmPassword" placeholder="請再輸入一次密碼">
        </div>
        <button class="submitBTN" @click="createAccount()">註冊</button>
    </div>
</template>

<style scoped lang="scss">
.registerBox {
    width: 100%;
    height: 85dvh;
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

    .userName,
    .userPhone,
    .userEmail,
    .userPassword,
    .passwordAgain {
        width: 80%;
        letter-spacing: 2px;

        h3 {
            margin: 1% 0;
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

    .submitBTN {
        width: 80%;
        height: 5dvh;
        letter-spacing: 5px;
        color: white;
        background-color: black;
        font-size: 20px;
        border-radius: 5px;
        cursor: pointer;
    }
}
</style>