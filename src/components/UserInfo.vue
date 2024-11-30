<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import { useCounterStore } from '@/stores/userStore';
import userDefIcon from '@/assets/userDefIcon.png'
export default {
    data() {
        return {
            userDefIcon,
            editMode: false,
            userId: "",
            userName: "",
            userPhone: "",
            userImage: "",
            introduce: "",
            userInfo: []
        }
    },
    methods: {
        editInfo() {
            if (this.editMode) {
                // 編輯模式，發送更新數據到後端
                const userData = {
                    userId: this.userId,
                    userName: this.userName,
                    introduce: this.introduce,
                    userImage: this.userImage
                };
                // console.log(userData);

                axios.post("http://localhost:8080/user/update", userData)
                    .then(response => {
                        if (response.status === 200) {
                            Swal.fire({
                                icon: 'success',
                                title: '成功',
                                text: '個人資料更新成功！',
                                confirmButtonText: '確定'
                            });
                        }
                    })
                    .catch(error => {
                        console.error('更新失敗：', error);
                        Swal.fire({
                            icon: 'error',
                            title: '錯誤',
                            text: '保存失敗，請稍後再試。',
                            confirmButtonText: '確定'
                        });
                    });
            }

            this.editMode = !this.editMode;
        },
        fileInput() {
            this.$refs.fileInput.click();
        },
        handleImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.userImage = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        fetchUserPhone() {
            const userStore = useCounterStore();
            const userPhone = userStore.userPhone;

            if (userPhone) {
                this.userPhone = userPhone;
            } else {
                console.warn("userPhone 未從 Pinia 中恢復");
            }
            // console.log(this.userPhone); //檢查
        },
        async fetchUserInfo() {
            try {
                const response = await axios.post("http://localhost:8080/user/select", {
                    userPhone: this.userPhone,
                });

                // 後端返回的用戶資料
                const userInfo = response.data;
                this.userId = userInfo.userId;
                this.userName = userInfo.userName;
                this.userImage = userInfo.coverImage;
                this.introduce = userInfo.introduce;
                // console.log(userInfo);

                const userStore = useCounterStore();
                userStore.setUserInfo(userInfo);
            } catch (error) {
                console.error("Failed to fetch user info:", error.response?.data || error.message);
            }
        },
    },
    mounted() {
        this.fetchUserPhone();
        this.fetchUserInfo();
    },
}
</script>

<template>
    <div class="nameAndPic">
        <img :src="userImage || userDefIcon" @click="fileInput" :style="{ cursor: editMode ? 'pointer' : 'default' }"
            alt="user image">
        <input type="file" ref="fileInput" style="display: none;" @change="handleImageChange" accept="image/*">
        <h1 v-if="!editMode">{{ this.userName }}</h1>
        <input v-if="editMode" v-model="userName" type="text" :placeholder="'輸入您的姓名'">
    </div>
    <div class="introduce">
        <h3>關於我</h3>
        <textarea style="resize: none;" :disabled="!editMode" v-model="introduce"
            :placeholder="introduce || '寫點什麼吧...'"> {{ introduce }}</textarea>
    </div>
    <button class="editBTN" @click="editInfo()">{{ editMode ? '完成' : '編輯個人檔案' }}</button>
</template>

<style scoped lang="scss">
.nameAndPic {
    width: 100%;
    max-height: 20dvh;
    display: flex;
    justify-content: start;
    align-items: center;
    position: relative;

    img {
        width: 60px;
        object-fit: contain;
    }

    h1 {
        margin-left: 5%;
    }

    input {
        width: 75%;
        font-size: 20px;
        padding: 3%;
        position: absolute;
        right: 0;
        background-color: rgba(147, 147, 147, 0.3);
        border: none;
        border-radius: 5px;
    }
}

.introduce {
    width: 100%;
    margin-top: 5%;

    textarea {
        width: 100%;
        min-height: 50dvh;
        font-size: 20px;
        padding: 3%;
        background-color: rgba(147, 147, 147, 0.3);
        border: none;
        border-radius: 5px;
    }
}

.editBTN {
    width: 10%;
    height: 5dvh;
    letter-spacing: 5px;
    color: white;
    background-color: black;
    font-size: 20px;
    border-radius: 5px;
    cursor: pointer;
    position: fixed;
    bottom: 1%;
    left: 7%;
}
</style>