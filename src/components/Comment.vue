<script>
import userDefIcon from '@/assets/userDefIcon.png';
import { usePostStore } from "@/stores/postStore";
import { useCounterStore } from "@/stores/userStore";

export default {
    data() {
        return {
            userDefIcon,
        }
    },
    computed: {
        selectedItem() {
            const postStore = usePostStore()
            return postStore.selectedItem
        },
        userInfo(){
            const userStore = useCounterStore()
            return userStore.userInfo
        },
    }
}

</script>

<template>
    <div class="postAndCommen">
        <div class="poster">
            <img :src="selectedItem.userImage || userDefIcon">
            <h2>{{ selectedItem.userName }}</h2>
            <span>{{ selectedItem.createTime }}</span>
        </div>
        <div class="postText">
            <span v-html="$sanitize(selectedItem.postContent).replace(/\n/g, '<br>')"></span>
        </div>
        <div class="allComment">
            <i class="fa-solid fa-turn-up fa-rotate-90"></i>
        </div>
    </div>
    <div class="userComment">
        <img :src="userInfo.userImage || userDefIcon">
        <h3>{{ userInfo.userName }}</h3>
        <input type="text" placeholder="回應這則貼文">
        <i class="fa-solid fa-paper-plane"></i>
    </div>
</template>

<style scoped lang="scss">
.postAndCommen {
    width: 100%;
    max-height: 80dvh;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    scrollbar-width: none;

    .poster {
        width: 100%;
        display: flex;
        justify-content: start;
        align-items: center;

        img {
            width: 30px;
            object-fit: contain;
        }

        h2 {
            margin-left: 1%;
        }

        span {
            font-size: 18px;
            color: gray;
            position: absolute;
            right: 2%;
        }
    }

    .postText {
        width: 100%;
        min-height: 20dvh;
        margin-top: 1dvh;
        overflow-y: scroll;
        scrollbar-width: none;
        display: flex;
        justify-content: center;

        span,
        textarea {
            width: 96%;
            font-size: 20px;
            margin-top: 1dvh;
            margin-bottom: 1dvh;
        }

        textarea {
            min-height: 18dvh;
            scrollbar-width: none;
            margin-right: 2%;
        }
    }

    .allComment {
        width: 100%;
        padding: 0.5%;
        border-top: 2px solid black;

        .fa-turn-up{
            font-size: 30px;
        }
    }
}

.userComment {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        width: 30px;
        object-fit: contain;
    }

    input {
        width: 88%;
        font-size: 20px;
        padding: 0.5%;
        background-color: rgba(147, 147, 147, 0.3);
        border: none;
        border-radius: 5px;
    }

    .fa-paper-plane {
        font-size: 20px;
        color: blue;
        position: relative;
        transition: 0.4s;

        &::after {
            content: "留言";
            width: 40px;
            opacity: 0;
            border-radius: 5px;
            font-size: 20px;
            flex-wrap: nowrap;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3px;
            position: absolute;
            top: -10%;
            left: 150%;
            background-color: black;
            color: white;
            transition: width 0.7s, opacity 0.7s;
            pointer-events: none;
        }

        &:hover::after {
            width: 60px;
            opacity: 1;
        }

        &:hover {
            scale: 1.3;
        }

        &:active {
            scale: 0.5;
        }
    }
}
</style>