<script>
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { watch } from 'vue';
import { useCounterStore } from '@/stores/userStore';
import { usePostStore } from "@/stores/postStore";
import userDefIcon from '@/assets/userDefIcon.png';
export default {
    data() {
        return {
            userDefIcon,
            postUserId: "",
            postUserName: "",
            postUserImg: "",
            postContent: "",
            postTime: "",
        }
    },
    methods: {
        fetchUser() {
            const store = useCounterStore();
            this.postUserId = store.userInfo.userId;
            this.postUserName = store.userInfo.userName;
            this.postUserImg = store.userInfo.userImage;
        },
        postBTN() {
            // 檢查內容
            if (!this.postContent.trim()) {
                Swal.fire({
                    icon: 'warning',
                    title: '內容為空！',
                    text: '請輸入貼文內容。',
                });
                return;
            }

            const postData = {
                userId: this.postUserId,
                postContent: this.postContent.replace(/\n/g, '<br>'),
                postImage: this.postUserImg || null, // 沒有圖片則傳 null
                createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            };
            console.log(postData);

            // 發送請求(寫在pinia)
            const postStore = usePostStore();
            postStore.addPost(postData);
            this.postContent = ""
        },
    },
    mounted() {
        const store = useCounterStore();
        this.fetchUser();
        watch(
            () => store.userInfo,
            (newUserInfo) => {
                if (newUserInfo.userId) {
                    this.fetchUser();
                }
            },
            { immediate: true } 
        );
    }
}

</script>

<template>
    <div class="unitPost">
        <div class="poster">
            <img :src="$sanitize(userImage) || userDefIcon" alt="user image">
            <h1>{{ postUserName }}</h1>
        </div>
        <div class="content">
            <textarea style="resize: none;" v-model="postContent" name="" id="" placeholder="想說什麼..."></textarea>
        </div>
        <button @click="postBTN()" class="postBTN">發佈</button>
    </div>
</template>

<style scoped lang="scss">
.unitPost {
    width: 95%;
    margin: 2% 0 1% 0;
    padding: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    border: 1px solid;
    border-radius: 5px;

    .poster {
        width: 100%;
        max-height: 20dvh;
        display: flex;
        justify-content: start;
        align-items: center;

        img {
            width: 30px;
            object-fit: contain;
        }

        h1 {
            margin-left: 1%;
        }
    }

    .content {
        width: 100%;
        height: 20dvh;
        padding: 1%;

        textarea {
            width: 100%;
            height: 100%;
            padding: 1%;
            font-size: 20px;
            background-color: rgba(147, 147, 147, 0.3);
            border: none;
            border-radius: 5px;
        }
    }

    .postBTN {
        width: 10%;
        height: 5dvh;
        margin-left: 88%;
        letter-spacing: 5px;
        color: white;
        background-color: black;
        font-size: 20px;
        border-radius: 5px;
        cursor: pointer;
    }
}
</style>