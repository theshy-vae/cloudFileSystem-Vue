<template>
    <div style="padding-left:50px;padding-top:20px">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="文件管理" name="FileSetting">
                <FileSetting/>
            </el-tab-pane>
            <el-tab-pane label="用户管理" name="UserSetting">
                <UserSetting/>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, watch, nextTick, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import FileSetting from '../components/FileSetting.vue'
import UserSetting from '../components/UserSetting.vue'
const activeName = ref('FileSetting')
</script>

<style lang="scss" scopted></style>