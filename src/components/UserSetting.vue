<template>
    <div>
        <el-table :data="tableData" style="max-width: 2000px" v-loading="loading">
            <el-table-column label="姓名" prop="name" style="width: 200px">
            </el-table-column>
            <el-table-column label="手机号" prop="phone" style="width: 200px" />
            <el-table-column label="用户名" prop="username" style="width: 200px" />


            <el-table-column label="注册时间" prop="createTime">
                <template #default="scope">
                    {{ convertToStandardFormat(scope.row.createTime) }}
                </template>
            </el-table-column>

            <el-table-column align="right">
                <template #header>
                    <el-input v-model="pageQuery.searchKey" size="large" placeholder="请输入关键字" />

                </template>
                <template #default="scope">
                    <el-button size="small" type="success" @click="openRestPassDialog(scope.row.id)">重置密码</el-button>


                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:currentPage="pageQuery.pageNo" :page-sizes="[10, 30, 40, 50]"
            :page-size="pageQuery.pageSize" background="true" layout="sizes, total, prev, pager, next" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        <el-dialog v-model="dialogVisible" :title="curFilename" fullscreen>
            <div style="height:calc(100vh - 75px) ;overflow: auto;">
                <Doc ref="docRef" />
            </div>
        </el-dialog>
    </div>

    <el-dialog v-model="dialogFormVisible" title="重置密码" ref="passDTORef" style="width: 400px;" destroy-on-close>
        <el-form :model="passDTO" :rules="rules" ref="passDTORef">
            <el-form-item label="新密码" prop="newPass" :label-width="formLabelWidth">
                <el-input v-model="passDTO.newPass" autocomplete="off" />
            </el-form-item>
        </el-form>
        <el-button type="primary" style="width: 100%;" @click="resetPassword">确定</el-button>
    </el-dialog>

</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, watch, nextTick, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import { getAllUserList, resetPass } from '../api/user.js'

let dialogFormVisible=ref(false)

interface UserInfo {
    userId: string
    username: string
    name: string
    phone: string
    createTime: string
}

let pageQuery = reactive({
    pageNo: 1,
    pageSize: 20,
    searchKey: ''
})

watch(() => pageQuery.searchKey, (newVal) => {
    getUsers()
})

//总条数
let total = ref(10)
let loading = ref(false)
//1-pdf 2-docx 3-excel
let fileType = ref(null)
let dialogVisible = ref(false)
let selectedFileId = ref(null)



let docRef = ref()
let curFilename = ref('')


const tableData = ref<UserInfo>([])

const handleSizeChange = (val: number) => {
    pageQuery.pageSize = val
    getUsers()
}
const handleCurrentChange = (val: number) => {
    pageQuery.pageNo = val
    getUsers()
}

watch(() => pageQuery.searchKey, (newVal) => {
    getUsers()
})

function getUsers() {
    console.log('pagequery:', pageQuery)
    loading.value = true
    getAllUserList(
        pageQuery
    ).then(res => {
        loading.value = false
        total.value = res.total
        tableData.value = res.list
        console.log('tableData;', tableData.value)
    })

}

onMounted(() => {
    getUsers()
})

let passDTO = reactive({
    userId: '',
    oldPass: '',
    newPass: ''
})

const rules = {
    newPass: [
        { required: true, message: "密码不能为空" },
        { min: 5, message: "密码长度在5-20" },
        { max: 20, message: "密码长度在5-20" }
    ]
};

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


function openRestPassDialog(userId){
    dialogFormVisible.value=true
    passDTO.userId=userId
}

function convertToStandardFormat(localDateTimeStr) {
    // 使用正则表达式来匹配并替换字符串中的'T'
    const standardDateTimeStr = localDateTimeStr.replace('T', ' ');
    return standardDateTimeStr;
}



</script>

<style lang="scss" scopted>
.hoverFont:hover {
    color: rgb(87, 152, 152);
}
</style>