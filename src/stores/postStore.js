import axios from "axios";
import Swal from "sweetalert2";
import { defineStore } from "pinia";

export const usePostStore = defineStore("postStore", {
    state: () => ({
        postInfo: [],
    }),
    actions: {
        getAllPost() {
            axios
                .get("http://localhost:8080/post/all")
                .then((response) => {
                    this.postInfo = response.data;
                })
                .catch((error) => {
                    console.error("There was an error fetching the posts:", error);
                });
        },
        addPost(postData) {
            axios
                .post("http://localhost:8080/post/create", postData)
                .then((response) => {
                    if (response.data.code === 200) {
                        Swal.fire({
                            title: "成功",
                            text: "貼文發佈成功！",
                            icon: "success",
                            confirmButtonText: "好的",
                        }).then(() => {
                            this.getAllPost();
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error message", error);
                });
        },
        updatePost(updateData) {
            axios
                .post("http://localhost:8080/post/update", updateData)
                .then((response) => {
                    if (response.data.code == 200) {
                        Swal.fire({
                            title: "成功",
                            text: "貼文更新成功！",
                            icon: "success",
                            confirmButtonText: "好的",
                        }).then(() => {
                            this.getAllPost();
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error message", error);
                });
        },
        dropPost(deleteDate) {
            Swal.fire({
                title: "確定要刪除這則貼文嗎？",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "確定",
                cancelButtonText: "取消"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post("http://localhost:8080/post/delete", deleteDate)
                        .then((response) => {
                            if (response.data.code === 200) {
                                Swal.fire({
                                    icon: 'success',
                                    title: '成功',
                                    text: '刪除貼文成功！',
                                    confirmButtonText: '確定'
                                }).then(() => {
                                    this.getAllPost();
                                });
                            }
                        })
                        .catch((error) => {
                            Swal.fire({
                                icon: 'error',
                                title: '錯誤',
                                text: '刪除貼文失敗，請稍後在試！',
                                confirmButtonText: '確定'
                            })
                            console.error("Error message", error);
                        });
                }
            })
        }
    },
});
