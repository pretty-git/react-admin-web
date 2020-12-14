import axios from 'axios'
import {message} from 'antd'
export default function ajax(url, data={}, type='GET', book='') {
    return new Promise((resolve,reject)=>{
        let promise = ''
        if(type === 'GET' || type === 'get') {
            promise = axios.get(url,{
                params:data 
            })
        }else {
            promise = axios.post(url,data)
        }
        promise.then(response=>{
            if(book === 'weather') {
                if(response.data.code === 200) {
                    resolve(response.data.newslist[0])
                }else {
                    message.error(response.data.msg)
                }
            }else {
                if(response.data.status === 0) {
                    resolve(response.data.data)
                }else {
                    message.error(response.data.msg)
                }
            }
            
        }).catch(error=>{
            message.error(error.message)
        })
    })
  
}
