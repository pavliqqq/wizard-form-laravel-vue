import "./bootstrap.js";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router.js";
import App from "./components/App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
