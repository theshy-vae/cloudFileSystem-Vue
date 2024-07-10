
import { sendRequest,http } from '../utils/axios/index.js';

export function getFileList(data){
    return sendRequest({
      method:'post',
      url:'/file/getFileList',
      data:data
    }

    )
}

export function getAllFileList(data){
  return sendRequest({
    method:'post',
    url:'/file/getAllFileList',
    data:data
  }

  )
}

export function deleteFile(fileId){
  return sendRequest({
    method:'get',
    url:'/file/deleteFile/'+fileId,
  }

  )
}