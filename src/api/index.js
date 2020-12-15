/*
包含应用中所有接口请求函数的模块
*/
/*
统一暴露
export default {
    xx() {
    },
    yyZ() {

    }
}
*/
//登录
import { message } from 'antd'
import jsonp from 'jsonp'
import ajax from './ajax'
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')
// export const reqAddUser = (user) =>{ return  ajax('/mannge/user/add',user, 'POST')}
export const reqAddUser = (user) => ajax('/mannge/user/add', user, 'POST')
export const requestWeather = () => ajax(`http://api.tianapi.com/txapi/tianqi/index?key=822223b862e1c2c4c519d390009205d4&city=深圳`,{},'get','weather')
// 商品分类模块
export const getCategory = (parentId ) => ajax('/manage/category/list',{parentId})
export const addCategory = (data) => ajax('/manage/category/add',data,'post')
export const updataCategory = (data) => ajax('manage/category/update',data,'post')


/**
 * @description jsonp 的包装
 */
export const requestWeather_jsonp = () => {
    return new Promise((resolve, reject) => {
        const url = `http://api.tianapi.com/txapi/tianqi/index?key=822223b862e1c2c4c519d390009205d4&city=深圳`
        jsonp(url, {}, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                message.error('获取天气信息失败')
            }
        })
    })
}
// requestWeather_jsonp('深圳')