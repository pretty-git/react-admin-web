
import React from 'react'
import { Form,  Input } from 'antd';
export default class AddForm extends React.Component {
    formRef = React.createRef();
    UNSAFE_componentWillMount() {
        this.props.setForm(this.formRef)
    }
    show = () => {
        setTimeout(()=>{
            // 防止出先下一次弹窗的输入框的值还是上次的
            this.formRef.current.setFieldsValue({
                categoryName:this.props.name
            })
        })
    }
    render() {
       this.show()
        return (
            <Form 
            ref={this.formRef}
            name="control-ref"
            >
               {/* {this.bookChild} */}
                <Form.Item
                    label="分类名称"
                    name="categoryName"
                    
                >
                    <Input placeholder="请输入" style={{ width: 300 }}></Input>
                </Form.Item>
            </Form>
        )
    }
}