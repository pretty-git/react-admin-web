import React from 'react'
import { Form, Input, Button, Tabs } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
/* 
登录路由组件
*/
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
const taber = {
    margin:0
}
export default class Login extends React.Component {
    
    render() {
        return (
            <div className="login">
                <div className="loginback">
                    <div className="logintitle">欢迎登陆本管理系统</div>
                    <div className="loginmain">
                        <div className="logincenter">
                            <Tabs defaultActiveKey="1" size="large" onChange={callback} animated="true" centered tabBarGutter={20} tabBarStyle={taber}>
                                <TabPane tab="账号登陆" key="1">
                                    <Form
                                       
                                        name="normal_login"
                                        className="login-form"
                                    >
                                        <Form.Item
                                            style={{margin:'10% 0',backgroundColor:'#eee'}}
                                            name="用户名"
                                            rules={[{ required: true, message: '请输入用户名' }]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                                        </Form.Item>
                                        <Form.Item
                                            name="密码"
                                            rules={[{ required: true, message: '请输入密码' }]}
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
                                    Content of Tab Pane 2
                               </TabPane>
                            </Tabs>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}