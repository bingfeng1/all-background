import Editor from '../pages/Blog/Editor'
import Home from '../pages/Home/Home'
import Articles from '../pages/Blog/Articles'
import ArticleGroup from '../pages/Blog/ArticleGroup'
const hostname = document.location.hostname
// 判断是否为本地，如果是那么显示，如果不是就不显示目录
const isNet = !(hostname.startsWith('192.168.1') || hostname === 'localhost')

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        title: "首页"
    },
    {
        path: '/blog',
        title: "博客",
        isNet,
        children: [
            {
                path: '/blog/editor',
                title: "个人信息",
                isNet,
                component: Editor
            },
            {
                path: '/blog/articles',
                title: "文章列表",
                isNet,
                component: Articles
            },
            {
                path: '/blog/articles-group',
                title: "文章分类管理",
                isNet,
                component: ArticleGroup
            }
        ]
    }
]

export default routes