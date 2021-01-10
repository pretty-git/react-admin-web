import React from 'react'
import { Form, Input, Button, Tabs, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'
import src from '../../resource/images/2.jpg'
import {login} from '../../redux/actions'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
const taber = {
    margin:0
}

 class Login extends React.Component {
    onFinish = async value =>{
        let {username, password} = value
        this.props.login(username, password) 
       // this.props.history.push('/')  push是可以回退到上一页的
        //  this.props.history.replace('/home') // replace是不可以回退到上一页的
    
    }
    render() {
        // 如果用户登录了就去管理后台
        const user = this.props.user
        if(user && user._id) {
            return <Redirect to='/home' />
        }
        return (
            <div className="login">
                <div className="loginback">
                    <div className="logintitle">欢迎登陆本管理系统</div>
                    <div className="loginmain">
                        <div className="logincenter">
                            <Tabs defaultActiveKey="1" size="large" onChange={callback} animated="true" centered tabBarGutter={20} tabBarStyle={taber}>
                                <TabPane tab="账号登陆" key="1">
                                    <Form
                                        onFinish={this.onFinish}
                                        name="normal_login"
                                        className="login-form"
                                    >
                                        <Form.Item
                                            style={{margin:'10% 0',backgroundColor:'#eee'}}
                                            name="username"
                                            rules={[{ required: true, message: '请输入用户名' }]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                                        </Form.Item>
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: '请输入密码' },
                                                    {min:4,message:"至少输入四位"}]}
                                        >
                                            <Input
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                                type="password"
                                                placeholder="密码"
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                登录
                                         </Button>
                                        </Form.Item>
                                    </Form>
                                </TabPane>
                                <TabPane tab="扫码登陆" key="2">
                                        
                                        <div className="weixinimg">
                                            <img src={src} alt="" object-fit="cover"/>
                                        </div>
                                        <h3 className="weixinName">使用微信扫码上方二维码登录系统</h3>
                               </TabPane>
                            </Tabs>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {login}
)(Login) 