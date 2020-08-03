/* 
    发送异步ajax请求的模块
    封装axios库
    函数的返回值是promise对象
*/
import axios from 'axios'
export default function ajax(url, data={}, type='GET') {
    /* 接口带参数请求
    axios.get('/user?ID=12345')
    接口带主题body请求
    axios.get('/user', {
        params: {
          ID: 12345
        }
      }) */
    if(type === 'GET' || type === 'get') {
        return axios.get(url,{  // 配置对象
            params:data // 指定参数
        })
    }else {
        return axios.post(url,data)
    }

}