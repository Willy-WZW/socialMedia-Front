<script>

</script>

<template>
    <div class="registerBox">
        <h1>註冊帳號</h1>
        <div class="userName">
            <h3>使用者名稱</h3>
            <input type="text" placeholder="請輸入使用者名稱">
        </div>
        <div class="userPhone">
            <h3>手機號碼</h3>
            <input type="text" placeholder="請輸入手機號碼">
        </div>
        <div class="userEmail">
            <h3>電子郵件</h3>
            <input type="text" placeholder="請輸入電子郵件">
        </div>
        <div class="userPassword">
            <h3>密碼</h3>
            <input type="password" placeholder="請輸入密碼">
        </div>
        <div class="passwordAgain">
            <h3>確認密碼</h3>
            <input type="password" placeholder="請再輸入一次密碼">
        </div>
        <button class="submitBTN">註冊</button>
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

    .submitBTN{
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