import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ArticlesHome from './ArticlesHome'
import ArticlesAddUpdate from './ArticlesAddUpdate'

// 文章列表总路由
const Articles = () => {
    return (
        <Switch>
            <Route path="/blog/articles/addupdate" component={ArticlesAddUpdate} />
            <Route path="/blog/articles" exact component={ArticlesHome} />
        </Switch>
    )
}

export default Articles