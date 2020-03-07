import { GET_ARTICLE_GROUP, ADD_ARTICLE_GROUP, DELETE_ARTICLE_GROUP, UPDATE_ARTICLE_GROUP } from "../actionTypes";

// 用于处理博客相关的reducer

const initArticleGroup = []

function articleGroup(state = initArticleGroup, action) {
    let newState = [...state]
    switch (action.type) {
        // 设置文章分组
        case GET_ARTICLE_GROUP:
            return action.value
        // 添加文章分组
        case ADD_ARTICLE_GROUP:
            return [...state, action.value]
        // 删除文章分组
        case DELETE_ARTICLE_GROUP:
            for (let index in newState) {
                if (newState[index]._id === action.value) {
                    newState.splice(index, 1)
                    return newState
                }
            }
            return newState;
        // 修改文章分组
        case UPDATE_ARTICLE_GROUP:
            for (let index in newState) {
                if (newState[index]._id === action.value._id) {
                    newState.splice(index, 1, action.value)
                    return newState
                }
            }
            return newState;
        default:
            return state;
    }
}

export default articleGroup