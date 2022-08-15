import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../components/left_nav';
import TopHeader from '../../components/top_header';
import {connect} from 'react-redux'
import './index.less'
// 页面路由部分
import Home from '../home'
import Category from '../category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Role from '../role'
import User from '../user'
import Product from '../product'
import NotFound from '../notfound'
const { Header, Footer, Sider, Content } = Layout;
/* 管理路由组件 */
 class Admin extends React.Component {
    render() {
       const user = this.props.user
        if (!user._id || !user) { // 当前没有登录
            // 自动跳转到登录（在render（）中）
            return <Redirect to='/login' />
        }
        return (
            <Layout className="main">
                <Sider className="left_nav">
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header className="top_hd">
                        <TopHeader></TopHeader>
                    </Header>
                    <Content className="main_bd">
                        {/* 配置路由 地址栏输入后去下面寻找匹配*/}
                        <Switch>
                            <Redirect exact={true} from="/" to='/home' /> 
                            {/* exact代表精准匹配 */}
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/product' component={Product} />
                            {/* 默认页面 */}
                            <Route component={NotFound} />
                        </Switch>
                        
                    </Content>
                    <Footer className="footer">由 pretty 开发</Footer>
                </Layout>
            </Layout>
        )
    }
}
export default connect(
    state => ({user:state.user}),{}
)(Admin) 