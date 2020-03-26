import { GET_EXTEND_LINK, ADD_EXTEND_LINK, UPDATE_EXTEND_LINK, DELETE_EXTEND_LINK } from "../actionTypes"
import { reqDeleteExtendLink, reqExtendLink, reqUpdateExtendLink, reqAddExtendLink } from "../../api"
import { message } from "antd"

// 获取分组
const getExtendLinkAction = async () => {
    const { status, data } = await reqExtendLink()
    if (status === 500) {
        message.error('服务器问题，无法获取数据')
        return {
            // 设置一个未拥有的值，那么页面在后端无法访问的时候，可以不报错
            type: Symbol()
        }
    } else {
        return ({
            type: GET_EXTEND_LINK,
            value: data
        })
    }
}

// 添加分组
const addExtendLinkAction = async (result) => {
    const myResult = await reqAddExtendLink(result)
    if (myResult.status !== 403) {
        message.success(`添加分组成功`)
        return ({
            type: ADD_EXTEND_LINK,
            value: myResult.data
        })
    } else {
        message.error(`添加分组失败`, result)
    }
}

// 修改分组
const updateExtendLinkAction = async (data) => {
    const { data: result } = await reqUpdateExtendLink(data)
    if (data.status !== 403) {
        message.success(`修改分组成功`)
        return ({
            type: UPDATE_EXTEND_LINK,
            value: data
        })
    } else {
        message.error(`修改分组失败`, result)
    }
}

// 删除分组
const deleteExtendLinkAction = async (data) => {
    const { data: result } = await reqDeleteExtendLink(data)
    if (result.ok === 1) {
        message.success("删除分组成功")
        return ({
            type: DELETE_EXTEND_LINK,
            value: data
        })
    } else {
        message.error("删除分组失败", result)
    }
}

export {
    getExtendLinkAction,
    addExtendLinkAction,
    updateExtendLinkAction,
    deleteExtendLinkAction
}