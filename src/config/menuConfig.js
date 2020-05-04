import Editor from '../pages/Blog/Editor'
import Home from '../pages/Home/Home'
import Articles from '../pages/Blog/Articles'
import ArticleGroup from '../pages/Blog/ArticleGroup'
import ExtendLink from '../pages/Extend/ExtendLink'
import TimedTask from '../pages/Extend/TimedTask'
import DragAPI from '../pages/Extend/LearnMore/DragAPI'
import CssPage from '../pages/Extend/CssPage/CssPage'

const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        icon: 'home',
        title: "首页"
    },
    {
        path: '/blog',
        title: "博客管理",
        icon: 'qrcode',
        children: [
            {
                path: '/blog/editor',
                title: "个人信息",
                icon: 'user',
                component: Editor
            },
            {
                path: '/blog/articles',
                title: "文章列表",
                icon: 'container',
                component: Articles
            },
            {
                path: '/blog/articles-group',
                title: "文章分类",
                icon: 'database',
                component: ArticleGroup
            }
        ]
    },
    {
        path: '/extend',
        title: '辅助功能',
        icon: 'usb',
        children: [
            {
                path: '/extend/extend-link',
                title: '扩展链接',
                icon: 'link',
                component: ExtendLink
            }, {
                path: '/extend/timed-task',
                title: '定时任务',
                icon: 'clock-circle',
                component: TimedTask
            }, {
                path: '/extend/build',
                title: '大屏组件',
                icon: 'build',
                children: [
                    {
                        path: '/extend/build/computer',
                        title: '服务器属性',
                        icon: 'robot',

                    }
                ]
            }, {
                path: '/extend/morejs',
                title: '更多（js）',
                icon: 'more',
                children: [
                    {
                        path: '/extend/morejs/drag',
                        title: '拖拽练习',
                        icon: 'drag',
                        component: DragAPI
                    }
                ]
            }, {
                path: '/extend/morecss',
                title: '更多（css）',
                icon: 'more',
                component: CssPage
            }
        ]
    }
]

export default routes