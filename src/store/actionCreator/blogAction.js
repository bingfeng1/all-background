import { GET_ARTICLE_GROUP, ADD_ARTICLE_GROUP, DELETE_ARTICLE_GROUP } from "../actionTypes"
import { reqDeleteArticleGroup } from "../../api"
import { message } from "antd"

// 获取分组
const getArticleGroupAction = (data) => {
    return ({
        type: GET_ARTICLE_GROUP,
        value: data
    })
}

// 添加分组
const addArticleGroupAction = (data) => {
    return ({
        type: ADD_ARTICLE_GROUP,
        value: data
    })
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
    addArticleGroupAction,
    deleteArticleGroupAction
}