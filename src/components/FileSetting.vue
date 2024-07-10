<template>
    <div>
        <el-table :data="tableData" style="max-width: 2000px" v-loading="loading">
            <el-table-column label="文件名" prop="filename" style="width: 200px">
                <template #default="scope">
                    <span class="hoverFont" @click="openFile(scope.row.id, scope.row.filename, scope.row.fileType)">{{ scope.row.filename
                        }}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名" prop="name" style="width: 200px"/>
            <el-table-column label="手机号" prop="phone" style="width: 200px"/>


            <el-table-column label="上传时间" prop="createTime">
                <template #default="scope">
                    {{ convertToStandardFormat(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column label="文件大小" prop="fileSize">
                <template #default="scope">
                    {{ size2Str(scope.row.fileSize) }}
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="pageQuery.searchKey" size="large" placeholder="请输入关键字" />

                </template>
                <template #default="scope">
                    <el-button size="small" type="success"
                        @click="downLoad(scope.row.id, scope.row.filename)">下载</el-button>
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled"
                        icon-color="#626AEF" title="你确定要删除吗" @confirm="handleDelete(scope.row.id)">
                        <template #reference>


                            <el-button size="small" type="danger">删除</el-button>
                        </template>

                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:currentPage="pageQuery.pageNo" :page-sizes="[10, 30, 40, 50]"
            :page-size="pageQuery.pageSize" background="true" layout="sizes, total, prev, pager, next" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        <el-dialog v-model="dialogVisible" :title="curFilename" fullscreen destroy-on-close>
            <div style="height:calc(100vh - 75px) ;overflow: auto;">
                <Doc ref="docRef" />
            </div>
        </el-dialog>
    </div>

</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, watch, nextTick, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getAllFileList, deleteFile } from '../api/uploadList.js'
import { convertToStandardFormat, size2Str } from '../utils/utils.js'
import Doc from '../components/Doc.vue'
import { Calendar, Search } from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from "element-plus";
import { getFileStream } from '../api/file.js'
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

interface FileInfo {
    filename: string
    createTime: string
    size: number
}

let pageQuery = reactive({
    pageNo: 1,
    pageSize: 20,
    searchKey: ''
})

watch(() => pageQuery.searchKey, (newVal) => {
    getFiles()
})

//总条数
let total = ref(10)
let loading = ref(false)
//1-pdf 2-docx 3-excel
let fileType = ref(null)
let dialogVisible = ref(false)
let selectedFileId = ref(null)



const handleDelete = (fileId: Number) => {
    deleteFile(fileId).then(res => {
        getFiles()
    })
}

let docRef = ref()
let curFilename = ref('')

const openFile = (fileId, filename, fileType) => {
    console.log(fileId, filename,fileType)
    curFilename.value = filename
    if (fileType == 1 || fileType == 2) {
        dialogVisible.value = true
        nextTick(() => {
            docRef.value.getFile(fileId, fileType)
        })

    } else {
        ElMessage.warning("该类型不支持在线预览")
    }
}

const tableData = ref<FileInfo>([])

const downLoad = (fileId, name) => {
    getFileStream(fileId).then(arrayBuffer => {
        if(arrayBuffer.byteLength==0)
            ElMessage.error("文件已经被删除")
        else{
            const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });

            // 创建一个指向Blob的URL
            const url = URL.createObjectURL(blob);

            // 创建一个隐藏的<a>标签用于下载
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('下载', curFilename.value); // 设置文件名
            link.download = name
            link.style.display = 'none';
            document.body.appendChild(link);

            // 触发下载
            link.click();

            // 清理URL
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

    })
}

const handleSizeChange = (val: number) => {
    pageQuery.pageSize = val
    getFiles()
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    pageQuery.pageNo = val
    getFiles()
}

watch(() => pageQuery.searchKey, (newVal) => {
    getFiles()
})

function getFiles() {
    console.log('pagequery:', pageQuery)
    loading.value = true
    getAllFileList(
        pageQuery
    ).then(res => {
        loading.value = false
        total.value = res.total
        tableData.value = res.list
        console.log('tableData;', tableData.value)
    })

}

onMounted(() => {
    getFiles()
})

function convertToStandardFormat(localDateTimeStr) {
    // 使用正则表达式来匹配并替换字符串中的'T'
    const standardDateTimeStr = localDateTimeStr.replace('T', ' ');
    return standardDateTimeStr;
}



</script>

<style lang="scss" scopted>
.hoverFont:hover{
    color: rgb(87, 152, 152);
}

</style>