import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk' // 用来实现redux异步的插件
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer'
/**
 * 初始化创建
 */
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)) )