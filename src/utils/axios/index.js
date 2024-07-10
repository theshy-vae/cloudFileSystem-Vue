// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import { ContentTypeEnum, RequestEnum, ResultEnum } from './enum.js'
import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import store from '../../store'

// 创建 axios 实例
const http = axios.create({
    baseURL: 'http://localhost:8000/', // 替换为你的 API 基础 URL
    // timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json', // 默认的请求头
    },
});


http.interceptors.request.use((config) => {
    if (store) {
        const token = store.getters.getToken;
        if (token)
            config.headers.Authorization = token
    }
    return config;
}, (error) => {
    //console.log(error)
    Promise.reject(error)
})

//响应的内容
http.interceptors.response.use((response) => {
    //响应成功
    let res = response.data;
    if (res.code !== 2000 && res.message) {
        ElMessage.error(res.message)
        return Promise.reject()
    }
    if(!(response.config.dontResovleData&&response.config.dontResovleData==true))
        res=res.data
    return Promise.resolve(res)
}, (error) => {
    console.log('error:', error)

    return Promise.reject()
})

// 普通请求
const sendRequest = async ({ method, url, data }) => {
    try {
        let response = await http.request({
            method,
            url,
            data,
        });
        return response;
    } catch (error) {
        console.log('error:', error)
    }
};

// 文件上传
const sendFileRequest = async ({ url, file, additionalData = {}, config = {} }) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        // 如果有额外的数据，添加到 formData 中
        for (const key in additionalData) {
            if (Object.prototype.hasOwnProperty.call(additionalData, key)) {
                formData.append(key, additionalData[key]);
            }
        }

        const response = await http.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...config,
        });
        return response.data;
    } catch (error) {
        console.log('error:', error)
    }
};

/**
 * @description: 活动文件流
 */
export function getFileBolb(url) {
    return http.request(
        {
            url,
            responseType: 'arraybuffer', // 因为是流文件，所以要指定blob类型
            method: 'GET',
            dontResovleData:true
        })

}



// 导出封装的方法
export { sendRequest, sendFileRequest, http };
