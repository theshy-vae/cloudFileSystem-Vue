import { sendRequest, sendFileRequest,getFileBolb } from '../utils/axios/index.js';

export function uploadFile(file){
    return sendFileRequest({
      url:'/file/uploadFile',
      file:file
    }
    )
}

export function getFileStream(fileId){
  return getFileBolb('/file/getFileStream/'+fileId)
}