/**
 * 包含n个用来创建action的工厂函数（action creator）
 */
import {INCREAT, DECREAT} from './action_types'
export const increment = number => {
   return  {type:INCREAT,data:number} 
}
export const decrement = number => {
    return  {type:DECREAT,data:number} 
 }
 export const awaitadd = number => {
   return  dispatch => {
      // 执行异步处理
      setTimeout(() => {
         // 分发action
         dispatch (increment(number)) 
      }, 1000);
   }
}