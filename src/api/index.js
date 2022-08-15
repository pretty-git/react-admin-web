/*
包含应用中所有接口请求函数的模块
*/
/*
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
export const reqCategory = (categoryId ) => ajax('/manage/category/info',{categoryId })
//商品管理模块
export const getProduct = (data) => ajax('/manage/product/list',data)
export const searchList = (data) => ajax('manage/product/search',data)
export const deleteImg = (name) => ajax('/manage/img/delete',{name},'post')
export const addProduct = (data) => ajax('/manage/product/add',data,'post')
export const updataProduct = (data) => ajax('/manage/product/update',data,'post')
export const put_down_Product = (data) => ajax('/manage/product/updateStatus',data,'post')
// 角色模块
export const getRoleList = () => ajax('manage/role/list')
export const addRole = (roleName) => ajax('manage/role/add',{roleName},'post')
export const updateRole = (data) => ajax('manage/role/update',data,'post')
// 用户模块
export const getUserList = () => ajax('manage/user/list')
export const addUser = (data) => ajax('manage/user/add',data,'post')
export const updateUser = (data) => ajax('manage/user/update',data,'post')
export const deleteUser = (userId) => ajax('manage/user/delete',{userId},'post')


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