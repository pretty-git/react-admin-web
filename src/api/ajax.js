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
            const {newslist, data, msg, code, status} = response.data
            if(book === 'weather') {
                if(code === 200) {
                    resolve(newslist[0])
                }else {
                    message.error(msg)
                }
            }else {
                if(status === 0) {
                    resolve(data)
                }else {
                    message.error(msg)
                }
            }
            
        }).catch(error=>{
            message.error(error.message)
        })
    })
  
}
