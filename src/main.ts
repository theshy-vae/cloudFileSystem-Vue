import { createApp } from 'vue'
import './style.css'
import router from './router'
import store from './store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { sendRequest, sendFileRequest,getFileBolb } from './utils/axios/index.js';

// 在应用初始化时执行的函数
function initializeApp() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user&&user.token) {
        // 验证 token
        sendRequest({
            method:'post',
            url:'/user/verifyToken',
            data:{token:user.token}
          }).then(response=>{
            if(response==true){
                store.commit('user',user)
                router.push('/main')
            }
          })

    }
}

initializeApp()

const app = createApp(App)
app.use(router).use(store).mount('#app')
