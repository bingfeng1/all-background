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

// 获取分类信息
const reqArticleGroup = () => {
    return axios.get('/private/getArticleGroup')
}

// 添加分类信息
const reqAddArticleGroup = data => {
    return axios.post('/private/addArticleGroup', data)
}

// 删除分类
const reqDeleteArticleGroup = data => {
    return axios.delete('/private/deleteArticleGroup', {
        data: {
            _id: data
        }
    })
}

// 获取文章
const reqArticles = () => {
    return axios.get('/private/getArticles')
}

// 添加/更新文章
const reqAddArticle = (data) => {
    return axios.post('/private/addArticle', data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}


export {
    reqEditor,
    reqArticles,
    reqUpdateEditor,
    reqAddArticle,
    reqArticleGroup,
    reqAddArticleGroup,
    reqDeleteArticleGroup
}