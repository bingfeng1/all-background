import React from 'react'
import { connect } from "react-redux";
import { getExtendLinkAction } from '../../store/actionCreator/extendLinkAction';
import { Dropdown, Button, Menu, Icon } from 'antd';

const AppHeader = ({
    extendLink,   // redux使用的ExtendLink（这里进行测试使用，主要在写文章的地方使用）
    getExtendLink,
}) => {
    // 获取链接信息
    if (extendLink.length === 0) {
        getExtendLink()
    }

    const menu = () => {
        return (
            <Menu>
                {
                    extendLink.map(item => {
                        if (item.url === document.location.pathname) {
                            return null
                        }
                        return (<Menu.Item key={item.url}>
                            <a target="_blank" rel="noopener noreferrer" href={item.url}>
                                {item.name}
                            </a>
                        </Menu.Item>)
                    })
                }
            </Menu>
        )
    }

    return (
        <>
            <div style={{ textAlign: 'center', color: '#619fff', fontSize: '1.5rem' }}>
                后台系统总站
            </div>
            <div style={{ position: 'absolute', top: 0, right: 20 }}>
                <Dropdown overlay={menu}>
                    <Button className="ant-dropdown-link"
                        onClick={e => e.preventDefault()}>
                        更多链接 <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        </>
    )
}


const mapStateToProps = state => {
    return {
        extendLink: state.extendLink
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getExtendLink: async () => {
            const action = await getExtendLinkAction()
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)