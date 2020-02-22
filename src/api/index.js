import axios from 'axios'

// 获取作者信息
const reqEditor = () => {
    return axios.get('/getEditor')
}

// 获取文章
const reqArticles = () => {
    return axios.get('/getArticles')
}

export {
    reqEditor,
    reqArticles
}