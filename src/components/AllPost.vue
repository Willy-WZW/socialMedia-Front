<script>
import userDefIcon from '@/assets/userDefIcon.png';
import { usePostStore } from "@/stores/postStore";
import { useCounterStore } from "@/stores/userStore";

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
        postInfo() {
            const postStore = usePostStore();
            return postStore.postInfo;
        },
        currentUserId (){
            const userStore = useCounterStore();
            return userStore.userInfo.userId;
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
            <div class="iconLeft">
                <i class="fa-regular fa-comment"></i>
            </div>
            <div class="iconRight">
                <i v-if="item.userId == currentUserId" class="fa-solid fa-user-pen"></i>
                <i v-if="item.userId == currentUserId" class="fa-solid fa-trash"></i>
            </div>
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
        justify-content: space-between;
        border-top: 1px solid;

        .iconLeft {
            width: 50%;

            .fa-comment {
                font-size: 24px;
                cursor: pointer;
                position: relative;

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
                    right: 110%;
                    background-color: black;
                    color: white;
                    transition: width 0.7s, opacity 0.7s;
                    pointer-events: none;
                }

                &:hover::after {
                    width: 60px;
                    opacity: 1;
                }
            }
        }

        .iconRight {
            width: 50%;
            display: flex;
            justify-content: end;

            .fa-user-pen,
            .fa-trash {
                font-size: 24px;
                cursor: pointer;
                position: relative;
            }

            .fa-user-pen {
                margin-right: 10%;
            }

            .fa-user-pen {
                &::after {
                    content: "編輯";
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
                    right: 110%;
                    background-color: black;
                    color: white;
                    transition: width 0.7s, opacity 0.7s;
                    pointer-events: none;
                }

                &:hover::after {
                    width: 60px;
                    opacity: 1;
                }
            }

            .fa-trash {
                &::after {
                    content: "刪除";
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
                    right: 110%;
                    background-color: black;
                    color: white;
                    transition: width 0.7s, opacity 0.7s;
                    pointer-events: none;
                }

                &:hover::after {
                    width: 60px;
                    opacity: 1;
                }
            }
        }
    }
}

.posts:nth-child(3n) {
    margin: 0 0 2% 0;
}
</style>