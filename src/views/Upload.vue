<template>
  <div style="display: flex;padding-left: 50px;padding-top: 20px;">
    <el-upload ref="uploadRef" style="width: 500px;"  action="" :before-upload="beforeUpload" :http-request="sendUpload"
      :auto-upload="false" drag :on-error="handleError" accept=".pdf, .doc,.docx,.xlsx">
      <template #trigger>
        <el-icon >
          <Plus />
        </el-icon>
        <div style="font-size: 15px;">点击或拖拽文件到此处上传</div>
        <div style="color: darkgray;font-size: 10px;">支持jpg、png、gif,文件大小不能超过5MB</div>

      </template>
    </el-upload>
    <el-button style="margin-left: 10px;" type="primary" @click="submitUpload">
        上传
      </el-button>
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import { uploadFile as upupupload } from '../api/file.js'
import { Plus } from '@element-plus/icons-vue'
const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
}


const beforeUpload = (file) => {
  // 这里可以添加文件类型、大小等检查逻辑
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    ElMessage.error('上传文件大小不能超过 5MB!');
  }
  return isLt2M;
};

const sendUpload = async ({ file }) => {
  let res = await upupupload(file)
};

const handleSuccess = (response, file, fileList) => {
  ElMessage.success('文件上传成功');
};

const handleError = (error, file, fileList) => {
  ElMessage.error(`文件上传失败: ${error.message}`);
};


</script>