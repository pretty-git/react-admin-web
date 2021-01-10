/**
 * reducer 函数模块： 根据当前的state和指定的action返回的一个新的state
 */
/**
 * 管理count状态数据的reducer
 */
// 固定格式

/**
 * 
 * @param {*} state 
 * @param {Object} action 是个对象，存 {
 *                                         type:标识属性，值为字符串，唯一的
 *                                         xxx:数据属性，值为任意类型
 *                                    }
 */
import {INCREAT, DECREAT} from './action_types'
export default function count(state = 1,action) {
    // console.log(state,action,'操作')
    switch (action.type) {
        case INCREAT:
            return state + action.data
        case DECREAT:
            return state - action.data
        default :
            return state
    }
}