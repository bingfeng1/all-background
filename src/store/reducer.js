import { combineReducers } from 'redux'
import articleGroup from './reducers/articleGroupReducer'
import extendLink from './reducers/extendLinkReducer'

export default combineReducers({
    articleGroup,
    extendLink
})