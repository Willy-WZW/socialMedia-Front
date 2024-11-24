import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("user", {
  state: () => ({
    userPhone: "", // 保存User手機號碼
    userInfo: {
      userId: "",
      userName: "",
      userPhone: "",
      userImage: "",
      introduce: "",
    }, // 保存User詳細資料
  }),
  actions: {
    setUserPhone(phone) {
      this.userPhone = phone;
    },
    setUserInfo(info) {
      this.userInfo = info;
    },
  },
});
