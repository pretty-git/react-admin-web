
import React from 'react'
import { Form, Input, Select } from 'antd';
const { Option } = Select
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}
export default class AddForm extends React.Component {
    formRef = React.createRef();
    UNSAFE_componentWillMount() {
        this.props.setForm(this.formRef)
    }
    show = () => {
        if (this.props.changeItem) {
            setTimeout(() => {
                // 防止出先下一次弹窗的输入框的值还是上次的
                let { username, phone, email } = this.props.changeItem
                this.formRef.current.setFieldsValue({
                    username,
                    phone,
                    email
                })
            })
        }
        setTimeout(() => {
            this.formRef.current.setFieldsValue({
                role_id: this.props.roleList[0]._id
            })
        })
        
    }
    render() {
        this.show()
        return (
            <Form
                ref={this.formRef}
                {...layout}
                name="control-ref"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '名称必须输入' }]}
                >
                    <Input placeholder="请输入" style={{ width: 300 }}></Input>
                </Form.Item>
                {
                    this.props.changeItem ? null : (
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '密码必须输入' }]}
                        >
                            <Input placeholder="请输入" type='password' style={{ width: 300 }}></Input>
                        </Form.Item>
                    )
                }

                <Form.Item
                    label="手机号"
                    name="phone"
                >
                    <Input placeholder="请输入" style={{ width: 300 }}></Input>
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                >
                    <Input placeholder="请输入" style={{ width: 300 }}></Input>
                </Form.Item>
                <Form.Item
                    label="角色"
                    name="role_id"
                    rules={[{ required: true, message: '名称必须输入' }]}
                >
                    <Select style={{ width: 200 }} >
                        {
                            this.props.roleList.map(item => {
                                return <Option key={item._id} value={item._id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form>
        )
    }
}