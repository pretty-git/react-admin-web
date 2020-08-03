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
import ajax from './ajax'
export const reqLogin = (username, password) => ajax('/login',{username,password},'POST')
// export const reqAddUser = (user) =>{ return  ajax('/mannge/user/add',user, 'POST')}
export const reqAddUser = (user) =>ajax('/mannge/user/add',user, 'POST')
