<template>
    <div class="framework">
        <div class="header">
            <div class="logo">
                <div class="name">Cloud</div>
            </div>
            <div>

            </div>
            <el-dropdown>
                <div class="user-info">
                    <div class="avatar">
                        <Avatar :username="user.username" :avatar="user.avatar" />
                    </div>
                    <span class="nickname">{{ user.username }}</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="openRestPassDialog">修改密码</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
        <div class="body">
            <div class="left-sider">
                <AsideMenu ref="asideMenuRef" />
            </div>
            <div class="body-content">
                <router-view />
                <!-- <router-view v-slot="{ Component }">
                    <component ref="routerViewRef" :is="Component" @addFile="addFile" />
                </router-view> -->
            </div>
        </div>
        <UploadAvatar ref="uploadAvatarRef" @upload-success="uploadAvatarSuccess" />
        <UploadPassword ref="uploadPasswordRef" />
    </div>

    <el-dialog v-model="dialogFormVisible" title="重置密码" style="width: 400px;" destroy-on-close>
        <el-form :model="passDTO" :rules="rules" label-width="65px" ref="passDTORef" >
            <el-form-item label="密码" prop="oldPass" :label-width="formLabelWidth">
                <el-input v-model="passDTO.oldPass" autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" prop="newPass" :label-width="formLabelWidth">
                <el-input v-model="passDTO.newPass" autocomplete="off" />
            </el-form-item>
        </el-form>
        <el-button type="primary" style="width: 100%;" @click="resetPassword">确定</el-button>
    </el-dialog>

</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch, nextTick, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from 'vuex'
import Avatar from '../components/Avatar.vue'
import { resetPass } from '../api/user.js'
const router = useRouter();
const store = useStore()

const user = store.state.user
const username = store.getters.getUsername

let dialogFormVisible = ref(false)

const handleLogout = () => {
    if (!user.rememberMe)
        store.commit('removeUser')
    router.push('/login')
}


let passDTO = reactive({
    userId: '',
    oldPass: '',
    newPass: ''
})

const rules = {
    oldPass: [
        { required: true, message: "密码不能为空" },
        { min: 5, message: "密码长度在5-20" },
        { max: 20, message: "密码长度在5-20" }
    ],
    newPass: [
        { required: true, message: "密码不能为空" },
        { min: 5, message: "密码长度在5-20" },
        { max: 20, message: "密码长度在5-20" }
    ]
};

function openRestPassDialog() {
    dialogFormVisible.value = true

}

let passDTORef = ref()

function resetPassword() {
    passDTORef.value.validate(async (valid) => {
        if (valid) {
            resetPass(passDTO).then(res => {
                if (res) {
                    ElMessage.success("修改成功")
                    passDTO.newPass = ''
                    passDTO.oldPass = ''
                    dialogFormVisible.value = false
                }
            })
        }

    })
}

</script>

<style lang="scss" scoped>
.framework {
    height: 100%;
    min-width: 1080px;
}

.header {
    box-shadow: 0 3px 10px 0 rgb(0 0 0 / 6%);
    height: 56px;
    padding-left: 24px;
    padding-right: 24px;
    position: relative;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
        display: flex;
        align-items: center;

        .icon-pan {
            font-size: 40px;
            color: #1296db;
        }

        .name {
            font-weight: bold;
            margin-left: 5px;
            font-size: 25px;
            color: #05a1f5;
        }
    }


    .user-info {
        margin-right: 30px;
        display: flex;
        align-items: center;
        cursor: pointer;

        .avatar {
            margin: 0px 5px 0px 15px;
        }

        .nick-name {
            color: #05a1f5;
        }
    }

}

.body {
    height: calc(100% - 56px);
    display: flex;

    .body-content {
        flex: 1;
        width: 0;
        // padding: 20px 0 0;
    }
}
</style>
