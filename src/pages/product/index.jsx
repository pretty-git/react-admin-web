import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Detail from './detail'
import AddUpdate from './add_update'
import Home from './home'
export default class Product extends React.Component {
    render() {
        return (
           <Switch>
               {/* path要有精准的匹配  exact */}
               <Route exact path='/product' component={Home}></Route>
               <Route exact path='/product/addupdate' component={AddUpdate}></Route>
               <Route exact path='/product/detail' component={Detail}></Route>
               <Redirect to='/product'></Redirect>
           </Switch>
          
        )
    }
}