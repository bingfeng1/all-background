import axios from 'axios'
import { BASE_URL } from '../config/apiStr';
import { message } from 'antd';

// 在发送前，增加url前缀
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.url = BASE_URL + config.url
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, err => {
    return message.error(`出现错误：${err}`)
})

// 获取作者信息
const reqEditor = () => {
    return axios.get('/private/getEditor')
}

// 修改个人信息
const reqUpdateEditor = (data) => {
    return axios.post('/private/updateEditor', data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}

// 获取文章
const reqArticles = () => {
    return axios.get('/private/getArticles')
}


export {
    reqEditor,
    reqArticles,
    reqUpdateEditor
}