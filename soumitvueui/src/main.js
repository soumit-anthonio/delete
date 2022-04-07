import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Notifications from '@kyvg/vue3-notification'

 createApp(App)
 .use(router)
 .use(VueSweetalert2)
 .use(Notifications)
 .mount('#app');
// new Vue({
//     render: h => h(App),
// }).$mount('#app')
