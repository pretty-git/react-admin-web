import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'  // antd样式
import App from './App'
import {Provider} from 'react-redux'
import store from './redux/store'
// 程序一上来就读取缓存中的信息

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    
    document.getElementById('root')
)
