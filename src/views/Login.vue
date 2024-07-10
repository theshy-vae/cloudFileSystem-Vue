<template>
    <div class="login-body">
        <div class="bg"></div>
        <div class="login-panel">
            <el-form v-if="type == 1" class="login-register" :model="registerForm" :rules="registerRules"
                ref="registerFormRef">
                <div class="login-title">注册</div>
                <el-form-item prop="username" class="usernameInput">
                    <el-input size="large" clearable placeholder="请输入用户名" v-model.trim="registerForm.username"
                        maxLength="150">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                    <div v-if="userListVisible"
                        style="position: absolute;top:50px;width: 100%;z-index: 99;background-color:white;max-height:400px; overflow: auto">

                    </div>
                </el-form-item>
                <el-form-item prop="name" class="usernameInput">
                    <el-input size="large" clearable placeholder="请输入姓名" v-model.trim="registerForm.name"
                        maxLength="150">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                    <div v-if="userListVisible"
                        style="position: absolute;top:50px;width: 100%;z-index: 99;background-color:white;max-height:400px; overflow: auto">

                    </div>
                </el-form-item>
                <el-form-item prop="phone" class="usernameInput">
                    <el-input size="large" clearable placeholder="请输入电话号码" v-model.trim="registerForm.phone"
                        maxLength="150">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                    <div v-if="userListVisible"
                        style="position: absolute;top:50px;width: 100%;z-index: 99;background-color:white;max-height:400px; overflow: auto">

                    </div>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="large" clearable placeholder="请输入密码" v-model.trim="registerForm.password"
                        maxLength="150">
                        <template #prefix>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size="large" clearable placeholder="请再次输入密码" v-model.trim="registerForm.checkPass"
                        maxLength="150">
                        <template #prefix>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="no-account">
                        <el-link type="primary" :underline="false" @click="type = 2">去登陆</el-link>
                    </div>
                </el-form-item>
                <el-form-item style="position: relative;">
                    <el-button class="op-btn" size="large" @click="submitRegister" type="primary"
                        style="margin-left: 5px;">注册</el-button>
                </el-form-item>

            </el-form>


            <el-form v-if="type == 2" class="login-register" :model="loginForm" :rules="loginRules" ref="loginFormRef">
                <div class="login-title">登录</div>
                <el-form-item prop="username" class="usernameInput">
                    <el-input size="large" clearable placeholder="请输入用户名" v-model.trim="loginForm.username"
                        maxLength="150">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input size="large" clearable placeholder="请输入密码" v-model.trim="loginForm.password"
                        maxLength="150">
                        <template #prefix>
                            <el-icon>
                                <Avatar />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item >
                    <div class="rememberme-panel">
                        <el-checkbox v-model="rememberMe" label="记住我" />
                    </div>

                    <div class="no-account">
                        <el-link type="primary" :underline="false" @click="type=1">没有账号？</el-link>
                    </div>
                </el-form-item>
                <el-form-item style="position: relative;">
                    <el-button class="op-btn" size="large" @click="submitLogin" type="primary"
                        style="margin-left: 5px;">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>


<script setup lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElButton, ElMessage, ElMessageBox } from 'element-plus'
import { reactive, onMounted, ref } from 'vue'
import { register, login } from '../api/user.js'
import { Coin, Avatar, ArrowDown, ArrowUp, User } from '@element-plus/icons-vue'
const store = useStore()
const router = useRouter()
let userListVisible = ref<boolean>(false)



//1注册 2登录
let type = ref(1)


const registerRules = {
    username: [
        { required: true, message: "用户名不能为空" },
        {min:2,message:"用户名长度在2-15"},
        {max:15,message:"用户名长度在2-15"}
    ],
    name: [
        { required: true, message: "姓名不能为空" },
    ],
    phone: [
        { required: true, message: "电话号码不能为空" }
    ],
    password: [
        { required: true, message: "密码不能为空" },
        {min:5,message:"密码长度在5-20"},
        {max:20,message:"密码长度在5-20"}
    ]
};

const loginRules = {
    username: [
        { required: true, message: "用户名不能为空" },
    ],
    password: [{ required: true, message: "密码不能为空" }]
};

function init() {
}

onMounted(() => {
    init()
})

const registerForm = reactive({
    username: '',
    name:'',
    phone:'',
    password: '',
    checkPass: ''
})

const loginForm = reactive({
    username: '',
    password: ''
})


let rememberMe = ref(false)

const registerFormRef = ref()
const loginFormRef = ref()

const submitRegister = () => {
    registerFormRef.value.validate(async (valid) => {
        if (!valid) {
            console.log('error')
            return;
        }
        if (registerForm.password !== registerForm.checkPass) {
            ElMessage.warning("两次密码不一致")
            return
        }
        let res = await register(registerForm)
        if(res)
            ElMessage.success('注册成功，请登录')
    })

}

const submitLogin = () => {
    loginFormRef.value.validate(async (valid) => {
        if (!valid) {
            console.log('error')
            return;
        }
        let user = await login(loginForm)
        if (user) {
            store.commit('setUser', {...user,...{rememberMe:rememberMe.value}})
            router.push('/main/upload')
        }

    })

}

let active = ref('')



</script>

<style scoped lang="scss">
.login-body {
    height: calc(100vh);
    // 把背景图像扩展至足够大，以使背景图像完全覆盖背景区域。
    background-size: cover;
    background: url("../assets/login_bg.jpg");
    display: flex;

    .bg {
        flex: 1;
        background-size: cover;
        background-position: center;
        background-size: 800px;
        // background-repeat: no-repeat;
        // background-image: url("../assets/login_img.png");
    }

    .login-panel {
        width: 430px;
        margin-right: 15%;
        margin-top: 15%;

        .login-register {
            padding: 25px;
            background: #fff;
            border-radius: 5px;

            .login-title {
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }

            .usernameInput {
                position: relative;
            }

            .rememberme-panel {
                width: 100%;
            }

            .no-account {
                width: 100%;
                display: flex;
                justify-content: space-between;
            }

            .op-btn {
                width: 100%;
            }
        }
    }


}
</style>