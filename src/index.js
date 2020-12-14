import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'  // antd样式
import App from './App'
import storageUtil from './utils/storageUtil.js'
import memoraUtil from './utils/memoryUtil.js'
// 程序一上来就读取缓存中的信息
const user = storageUtil.getUSer()
memoraUtil.user = user
ReactDOM.render(
    <App />,
    document.getElementById('root')
)
