<script>
import userDefIcon from '@/assets/userDefIcon.png';
import { usePostStore } from "@/stores/postStore";
export default {
    data() {
        return {
            userDefIcon,
            postInfo: [],
        }
    },
    methods: {
        
    },
    mounted() {
        const postStore = usePostStore();
        postStore.getAllPost(); 
    },
    computed: {
        postInfo(){
            const postStore = usePostStore();
            return postStore.postInfo;
        }
    }
}
</script>

<template>
    <div class="posts" v-for="item in postInfo" :key="item.postId">
        <div class="posterImgName">
            <img :src="item.userImage || userDefIcon" alt="user image">
            <h2>{{ item.userName }}</h2>
            <span>{{ item.createTime }}</span>
        </div>
        <div class="postText">
            <span v-html="$sanitize(item.postContent).replace(/\n/g, '<br>')"></span>
        </div>
        <div class="commentIcon">
            <i class="fa-regular fa-comment"></i>
        </div>
    </div>
</template>

<style scoped lang="scss">
.posts {
    min-width: 32%;
    max-width: 32%;
    padding: 1%;
    display: flex;
    align-items: start;
    flex-direction: column;
    margin: 0 2% 2% 0;
    border: 1px solid;
    border-radius: 5px;

    .posterImgName {
        width: 100%;
        max-height: 20dvh;
        display: flex;
        justify-content: start;
        align-items: center;
        position: relative;

        img {
            width: 30px;
            object-fit: contain;
        }

        h2 {
            margin-left: 1%;
        }

        span {
            font-size: 15px;
            color: gray;
            position: absolute;
            right: 0;
        }
    }

    .postText {
        width: 100%;
        max-height: 15dvh;
        overflow-y: scroll;
        scrollbar-width: none;
        display: flex;
        justify-content: end;

        span {
            width: 96%;
            margin-top: 1dvh;
        }
    }

    .commentIcon {
        width: 98%;
        margin-top: 1%;
        padding: 1%;
        display: flex;
        justify-content: start;
        border-top: 1px solid;

        .fa-comment {
            font-size: 24px;
        }
    }
}

.posts:nth-child(3n) {
    margin: 0 0 2% 0;
}
</style>