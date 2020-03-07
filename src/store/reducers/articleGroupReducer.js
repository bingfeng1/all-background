import { GET_ARTICLE_GROUP, ADD_ARTICLE_GROUP, DELETE_ARTICLE_GROUP } from "../actionTypes";

// 用于处理博客相关的reducer

const initArticleGroup = []

function articleGroup(state = initArticleGroup, action) {
    switch (action.type) {
        // 设置文章分组
        case GET_ARTICLE_GROUP:
            return action.value
        case ADD_ARTICLE_GROUP:
            return [...state, action.value]
        case DELETE_ARTICLE_GROUP:
            const newState = [...state]
            for (let index in newState) {
                if (newState[index]._id === action.value) {
                    newState.splice(index, 1)
                    return newState
                }
            }
            return newState;
        default:
            return state;
    }
}

export default articleGroup