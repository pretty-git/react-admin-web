import React from 'react';
import {  BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login'
import Admin from './pages/admin'
import './utils/common.less'
function App() {
  return (
    // <BrowserRouter></BrowserRouter> 路由地址不带#
    // HashRouter 路由地址带#
    <BrowserRouter> 
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
