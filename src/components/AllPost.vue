<script>
import userDefIcon from '@/assets/userDefIcon.png';
export default {
    data() {
        return {
            userDefIcon,
            postInfo:[],
        }
    }
}
</script>

<template>
    <div class="posts" v-for="(item, index) in postInfo" :key="index">
        <div class="posterImgName">
            <img :src="item.userImage || userDefIcon" alt="user image">
            <h2>{{ item.userName }}</h2>
            <span>{{ "發文日期" }}</span>
        </div>
        <div class="postText">
            <span>{{ item.postContent }}</span>
        </div>
        <div class="commentIcon">
            <i class="fa-regular fa-comment"></i>
        </div>
    </div>
</template>

<style scoped lang="scss">
.posts {
    min-width: 32%;
    padding: 1%;
    display: flex;
    align-items: start;
    flex-direction: column;
    margin: 2dvh 2% 0 0;
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

        span{
            font-size: 15px;
            color: gray;
            position: absolute;
            right: 0;
        }
    }

    .postText{
        width: 100%;
        display: flex;
        justify-content: end;
        span{
            width: 96%;
            margin-top: 1dvh;
        }
    }

    .commentIcon{
        width: 98%;
        margin-top: 1%;
        padding: 1%;
        display: flex;
        justify-content: start;
        border-top: 1px solid;
        .fa-comment{
            font-size: 24px;
        }
    }
}

.posts:nth-child(3n){
    margin: 2dvh 0 0 0;
}
</style>