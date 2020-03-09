import { GET_EXTEND_LINK, ADD_EXTEND_LINK, DELETE_EXTEND_LINK, UPDATE_EXTEND_LINK } from "../actionTypes"

// 用于处理博客相关的reducer

const initArticleGroup = []

function extendLink(state = initArticleGroup, action) {
    let newState = [...state]
    switch (action.type) {
        // 设置文章分组
        case GET_EXTEND_LINK:
            return action.value
        // 添加文章分组
        case ADD_EXTEND_LINK:
            return [...state, action.value]
        // 删除文章分组
        case DELETE_EXTEND_LINK:
            for (let index in newState) {
                if (newState[index]._id === action.value) {
                    newState.splice(index, 1)
                    return newState
                }
            }
            return newState;
        // 修改文章分组
        case UPDATE_EXTEND_LINK:
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

export default extendLink