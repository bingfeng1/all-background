import React from 'react'
import routes from '../../config/menuConfig'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu

// 递归生成主页面路由
const createLink = routes => {
    return routes.map(route => {
        if (!route.isNet) {
            if (route.children) {
                return (
                    <SubMenu
                        key={route.path}
                        title={
                            <span>
                                <Icon type="border-outer" />
                                <span>{route.title}</span>
                            </span>
                        }>
                        {
                            createLink(route.children)
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={route.path}>
                        <Link to={route.path}>
                            <Icon type="border-outer" />
                            {route.title}
                        </Link>
                    </Menu.Item>
                )
            }
        } else {
            return null
        }
    })
}

export default createLink(routes)