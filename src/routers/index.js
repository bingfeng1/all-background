// 所有路由的集合配置
import React from 'react'
import { Route } from 'react-router-dom'
import routes from '../config/menuConfig'

const Routes = (routes) => {
    // 配置路由
    return (
        routes.map(item => {
            if (!item.isNet) {
                if (item.children) {
                    return Routes(item.children)
                }
                return (
                    <Route
                        exact={item.exact}
                        key={item.path}
                        path={item.path}
                        component={item.component} />
                )
            } else {
                return null
            }
        })
    )
}

export default Routes(routes)