/**
 * 根据现有的state和指定的action  return新的state
 */

import storageUtil from "../utils/storageUtil"
import {combineReducers} from 'redux'
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    RESET_USER
} from './action-types'
//  头部标题
const initHeadeTitle = ''
 function headTitle(state=initHeadeTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
 }

 // 管理当前用户的函数
const initUser = storageUtil.getUSer()
function user(state=initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
           return action.user
        case RESET_USER:
            return {}
        default:
            return state
    }
}
/**
 * 向外默认暴露的是合并后产生的总的reducer函数
 */
 export default combineReducers({
     user,
     headTitle
 })