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
    const { data } = response
    if (data.status === 403) {
        message.error(`${data.msg}`)
    }
    if (data.status === 500) {
        message.error(`服务器处理问题${data.msg}`)
    }
    return response;
}, err => {
    message.error(`出现错误：${err}`)
    return err.response
})

// 获取作者信息
const reqEditor = () => {
    return axios.get('/editor')
}

// 修改个人信息
const reqUpdateEditor = (data) => {
    return axios.put('/editor', data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}

// 获取分类信息
const reqArticleGroup = () => {
    return axios.get('/articleGroup')
}

// 添加或修改分类信息
const reqAddOrUpdateArticleGroup = data => {
    const method = !!data._id ? 'put' : 'post'
    return axios[method](`/articleGroup`, data)
}

// 删除分类
const reqDeleteArticleGroup = data => {
    return axios.delete('/articleGroup', {
        data: {
            _id: data
        }
    })
}

// 获取文章
const reqArticles = () => {
    return axios.get('/articles')
}

// 添加文章
const reqAddArticle = (data) => {
    return axios.post('/articles', data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}

// 删除文章
const reqDeleteArticle = (_id) => {
    return axios.delete('/articles', {
        data: {
            _id
        }
    })
}

// 获取文章详情
const reqArticleDetail = (_id) => {
    return axios.get('/articleDetail', {
        params: {
            _id
        }
    })
}

// 更新文章信息
const reqUpdateArticle = (data) => {
    return axios.put('/articleDetail', data, {
        headers: { "Content-Type": "multipart/form-data" }
    })
}


// 获取分类信息
const reqExtendLink = () => {
    return axios.get('/extendLink')
}

// 添加分类信息
const reqAddExtendLink = data => {
    return axios.post(`/extendLink`, data)
}

// 修改分类信息
const reqUpdateExtendLink = data => {
    return axios.put(`/extendLink`, data)
}

// 删除分类
const reqDeleteExtendLink = data => {
    return axios.delete('/extendLink', {
        data: {
            _id: data
        }
    })
}

// 获取定时任务
const reqGetTimedTask = () => {
    return axios.get('/timedTask')
}

// 修改定时任务
const reqUpdateTimedTask = (data) => {
    return axios.put('/timedTask', data)
}

// 获取病毒信息
const reqGetNcov = () => {
    return axios.get('/ncov')
}

// 获取服务器信息
const reqGetComputerInfo = () => {
    return axios.get('/computerInfo')
}

// 获取实时疫情
const reqGetNcovDetail = () => {
    return axios.get('/TXNcovInfo')
}

export {
    reqEditor,
    reqArticles,
    reqUpdateEditor,
    reqAddArticle,
    reqArticleGroup,
    reqAddOrUpdateArticleGroup,
    reqDeleteArticleGroup,
    reqDeleteArticle,
    reqArticleDetail,
    reqUpdateArticle,
    reqExtendLink,
    reqAddExtendLink,
    reqDeleteExtendLink,
    reqUpdateExtendLink,
    reqGetTimedTask,
    reqUpdateTimedTask,
    reqGetNcov,
    reqGetComputerInfo,
    reqGetNcovDetail
}