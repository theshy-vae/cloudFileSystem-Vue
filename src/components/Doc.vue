<template>
  <div class="office-previewer">
    <el-scrollbar>
      <div class="doc-content" ref="docRef">
        <vue-office-pdf :options="options" :src="data" v-if="type === 1" />
        <vue-office-docx :options="options" :src="data" v-if="type===2"/>
        <vue-office-excel :options="options" src="http://static.shanhuxueyuan.com/demo/excel.xlsx" v-if="type===3"/>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch, nextTick, computed, onMounted, defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getFileStream } from '../api/file.js'
import VueOfficePdf from '@vue-office/pdf'
import VueOfficeDocx from '@vue-office/docx'
import VueOfficeExcel from '@vue-office/excel'
//引入相关样式
import '@vue-office/excel/lib/index.css'
//引入相关样式
import '@vue-office/docx/lib/index.css'
import { ElMain } from "element-plus";
const router = useRouter();
const route = useRoute();

let type = ref(null)

let pdfLoadingTask=null
let numPages=ref(0)

defineExpose({getFile})

function getFile(fileId,fileType) {
  
  console.log('fileId:', fileId,',type:',fileType)
  if (fileId) {
    type.value=fileType
    getFileStream(fileId).then(response => {
      debugger;
      if (!response||response.byteLength==0){
        ElMessage.error("文件已经被删除")
        return
      }
      data.value = response
      setTimeout(() => {
        data.value=''
        setTimeout(() => {
          data.value = response
        }, 20);
      }, 0);
    })
  }

}

const data = ref('')
const options = ref({
  width: 794,
  minColLength: 10 // 有几列，就渲染几列
})
</script>

<style lang="scss" scoped>
.office-previewer {
  padding: 60px 0 0 0;
  height: 100%;

  .doc-content {
    margin: 0 auto;

    :deep(.docx-wrapper),
    :deep(.vue-office-pdf-wrapper) {
      background: #f2f4f7 !important;
    }

    :deep(.docx-wrapper > section.docx) {
      box-shadow: rgba(158, 161, 165, 0.4) 0px 2px 12px 0px;
      margin-bottom: 19px;
    }

    :deep(.vue-office-pdf-wrapper canvas) {
      box-shadow: rgba(158, 161, 165, 0.4) 0px 2px 12px 0px;
      margin-bottom: 19px;
    }
  }
}
</style>