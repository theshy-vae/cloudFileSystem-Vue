
import { sendRequest } from '../utils/axios/index.js';

export function register(data){
    return sendRequest({
      method:'post',
      url:'/user/register',
      data:data
    }
    )
}

export function login(data){
  return sendRequest({
    method:'post',
    url:'/user/login',
    data:data
  }
  )
}

export function getAllUserList(data){
  return sendRequest({
    method:'post',
    url:'/user/getAllUserList',
    data:data
  }
  )
}

export function resetPass(data){
  return sendRequest({
    method:'post',
    url:'/user/resetPass',
    data:data
  }
  )
}