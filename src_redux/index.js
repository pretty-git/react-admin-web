import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import {Provider} from 'react-redux'
import store from './redux/store'
ReactDOM.render((
<Provider store={store}>
      <App />
</Provider>),
    document.getElementById('root')
)
// 给store绑定状态更新的监听
// store.subscribe(()=>{
//     // console.log('store更新') 重新渲染App
//     ReactDOM.render(
//         <App store={store}/>,
//         document.getElementById('root')
//     )
// })