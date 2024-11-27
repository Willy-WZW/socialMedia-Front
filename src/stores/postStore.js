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
    },
});
