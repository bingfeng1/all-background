import Editor from '../pages/Blog/Editor'
import Home from '../pages/Home/Home'
import Articles from '../pages/Blog/Articles'

const routes = [
    {
        path: '/',
        exact: true,
        // component: Home,
        component: Editor,
        title: "首页"
    },
    {
        path: '/blog',
        title: "博客",
        children: [
            {
                path: '/blog/editor',
                title: "个人信息",
                component: Editor
            },
            {
                path: '/blog/articles',
                title: "文章列表",
                component: Articles
            }
        ]
    }
]

export default routes