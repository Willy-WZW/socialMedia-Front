<script>
import dayjs from 'dayjs';
import userDefIcon from '@/assets/userDefIcon.png';
import { usePostStore } from "@/stores/postStore";
import { useCounterStore } from "@/stores/userStore";

export default {
    data() {
        return {
            userDefIcon,
            editMode: false,
        }
    },
    methods: {
        editPost(item) {
            item.editMode = !item.editMode
            if (item.editMode) {
                // 進入編輯模式時將 <br> 替換為 \n
                item.postContent = item.postContent.replace(/<br>/g, '\n');

            }
            // 儲存到DB
            if (!item.editMode) {
                const updateData = {
                    postId: item.postId,
                    userId: item.userId,
                    postContent: item.postContent,
                    postImage: item.postImage,
                    createTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                }
                console.log(updateData);
                const postStore = usePostStore();
                postStore.updatePost(updateData);
            }
            this.$nextTick(() => {
                const textarea = document.querySelector(`#textarea-${item.postId}`);
                if (textarea) {
                    textarea.style.height = 'auto'; // 重設高度
                    textarea.style.height = `${textarea.scrollHeight}px`; // 設置內容高度
                } else {
                    console.error(`Textarea not found for postId: ${item.postId}`);
                }
            });
        },
        autoResize(event) {
            const textarea = event.target;
            textarea.style.height = 'auto'; // 先重設高度，避免新增文字時滾動條出現
            textarea.style.height = `${textarea.scrollHeight}px`; // 設置為文字內容高度
        },
        deletePost(item) {
                const deleteData = {
                    postId: item.postId,
                    userId: item.userId,
                }
                // console.log(deleteData);
                const postStore = usePostStore();
                postStore.dropPost(deleteData);
            
        }
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
        currentUserId() {
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
            <span v-if="!item.editMode" v-html="$sanitize(item.postContent).replace(/\n/g, '<br>')"></span>
            <textarea v-show="item.editMode" v-model="item.postContent" @input="autoResize($event)"
                style="resize: none;" :id="'textarea-' + item.postId"></textarea>
        </div>
        <div class="commentIcon">
            <div class="iconLeft">
                <i class="fa-regular fa-comment"></i>
            </div>
            <div class="iconRight">
                <i v-if="item.userId == currentUserId && !item.editMode" @click="editPost(item)"
                    class="fa-solid fa-user-pen"></i>
                <i v-if="item.editMode" @click="editPost(item)" class="fa-solid fa-check"></i>
                <i v-if="item.userId == currentUserId && !item.editMode" @click="deletePost(item)"
                    class="fa-solid fa-trash"></i>
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
        min-height: 20dvh;
        overflow-y: scroll;
        scrollbar-width: none;
        display: flex;
        justify-content: end;

        span,
        textarea {
            width: 96%;
            font-size: 20px;
            margin-top: 1dvh;
            margin-bottom: 2%;
        }

        textarea {
            min-height: 18dvh;
            scrollbar-width: none;
            margin-right: 2%;
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
            .fa-check,
            .fa-trash {
                font-size: 24px;
                cursor: pointer;
                position: relative;
            }

            .fa-user-pen {
                margin-right: 10%;
            }

            .fa-user-pen,
            .fa-check {
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

            .fa-check {
                color: green;

                &::after {
                    content: "完成";
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