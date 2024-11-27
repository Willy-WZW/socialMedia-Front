import "./assets/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import DOMPurify from "dompurify"; // 引入 dompurify 防止 XSS

import App from "./App.vue";
import router from "./router";
import pinia from "@/stores/userStore";

const app = createApp(App);

app.use(createPinia());
app.use(pinia);
app.use(router);

// 全局使用方法
app.config.globalProperties.$sanitize = (value) => {
    if (!value) return "";
    return DOMPurify.sanitize(value);
};

app.mount("#app");
