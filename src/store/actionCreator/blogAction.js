import { GET_ARTICLE_GROUP, ADD_ARTICLE_GROUP, DELETE_ARTICLE_GROUP, UPDATE_ARTICLE_GROUP } from "../actionTypes"
import { reqDeleteArticleGroup, reqArticleGroup, reqAddOrUpdateArticleGroup } from "../../api"
import { message } from "antd"

// 获取分组
const getArticleGroupAction = async () => {
    const { data } = await reqArticleGroup()
    return ({
        type: GET_ARTICLE_GROUP,
        value: data
    })
}

// 添加/修改分组
const addOrUpdateArticleGroupAction = async (result) => {
    const flag = !!result._id
    const { data } = await reqAddOrUpdateArticleGroup(result)
    if (data.status !== "403") {
        message.success(`${flag ? '修改' : '添加'} 分组成功`)
        return ({
            type: flag ? UPDATE_ARTICLE_GROUP : ADD_ARTICLE_GROUP,
            value: data
        })
    } else {
        message.error(`${flag ? '修改' : '添加'}分组失败`, result)
    }
}

// 删除分组
const deleteArticleGroupAction = async (data) => {
    const { data: result } = await reqDeleteArticleGroup(data)
    if (result.ok === 1) {
        message.success("删除分组成功")
        return ({
            type: DELETE_ARTICLE_GROUP,
            value: data
        })
    } else {
        message.error("删除分组失败", result)
    }
}

export {
    getArticleGroupAction,
    addOrUpdateArticleGroupAction,
    deleteArticleGroupAction
}