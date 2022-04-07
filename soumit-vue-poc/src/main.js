import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/js/bootstrap.js"
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

createApp(App).use(router).use(VueSweetalert2).mount('#app')
