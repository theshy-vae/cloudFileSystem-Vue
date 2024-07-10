<template >
    <el-menu default-active="2" class="el-menu-vertical-demo" style="height:100vh;" :collapse="true" @open="handleOpen"
        @close="handleClose">

        <el-menu-item index="2" @click="router.push('/main/upload')" >
            <el-icon><icon-menu /></el-icon>
            <template #title>上传文件</template>
        </el-menu-item>
        <el-menu-item index="3" @click="router.push('/main/uploadList')">
            <el-icon>
                <document />
            </el-icon>
            <template #title>文件列表</template>
        </el-menu-item>
        <el-menu-item index="4" v-if="store.getters.getIsAdmin"  @click="router.push('/main/setting')">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>设置</template>
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
const store = useStore()
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const router = useRouter()

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
}
const handleClose = (key: string, keyPath: string[]) => {
}
</script>

<style lang="scss" scopted>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>