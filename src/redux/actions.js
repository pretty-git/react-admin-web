/**
 * 包含n个 aciton creator函数的模块
 * 同步action : {type:'xxx', data:''}
 * 异步action: 函数： dispatch => {}
 */
import {reqLogin} from '../api/index'
import storageUtil from '../utils/storageUtil'
import {message} from 'antd'
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,RESET_USER
} from './action-types'
export const setHeadTitle = (headTitle) => ({
    type:SET_HEAD_TITLE,
    data:headTitle
})

export const receiveUser = (user) => ({type: RECEIVE_USER, user})
/**
 * 登录的异步action
 */
export const login = (username,password) => {
    return async dispatch => {
        // 执行异步ajax请求
    const user =  await  reqLogin(username,password) 
    storageUtil.saveUSer(user) //存入缓存
    message.success('登录成功')
    dispatch(receiveUser(user))
    }
}

export const logout = () => {
    storageUtil.removeUser()
   return {type:RESET_USER}
} 