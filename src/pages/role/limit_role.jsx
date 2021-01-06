
import React from 'react';
import { Tree, Form, Input } from 'antd';
import menuList from '../../config/menuConfig'
export default class Limitform extends React.Component {
    formRef = React.createRef();
    state = {
        checkedKey:[],
        treeData:[]
    }
        
    onCheck = checkedKeys => {
        this.setState({
            checkedKey:checkedKeys
        })
    };
    /**
     * @description 为父组件提供数据
     */
    getKeys = () => {
        return this.state.checkedKey
    }
    getName = () => {
        setTimeout(() => {
            // 防止出先下一次弹窗的输入框的值还是上次的
            this.formRef.current.setFieldsValue({
                rolename: this.props.name
            })
        })
    }
    init = (list) => {
        let menlist = list.map(item => {
            if (item.children) {
                return {
                    title: item.title,
                    key: item.key,
                    children: this.init(item.children)
                }
            } else {
                return {
                    title: item.title,
                    key: item.key
                }
            }

        })

        return menlist

    }
    // 第一次获取menu
    componentDidMount() {
        this.setState({
            checkedKey:this.props.menu
        })
    }
    // 再根据新传入的role来更新状态 // 不然会出现点击不了
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            checkedKey:nextProps.menu
        })
     }
    UNSAFE_componentWillMount() {
        this.props.setForm(this.formRef)
        let menuLists = [{
            title: '平台权限',
            key: 'top',
            children: []
        }]
        menuLists[0].children = this.init(menuList)
        this.setState({
            treeData: menuLists
        })
    }
    
    render() {
        this.getName()
        const {checkedKey} = this.state
        return (
            <Form
                ref={this.formRef}
                name="control-ref"
            >
                <Form.Item
                    label="角色名称"
                    name="rolename"
                    rules={[{ required: true, message: '名称必须输入' }]}
                >
                    <Input placeholder="请输入" style={{ width: 300 }} disabled={true}></Input>
                </Form.Item>
                <Form.Item
                    label="角色名称"
                    name="tree"
                >
                    <Tree
                        checkedKeys={checkedKey}
                        checkable
                        defaultExpandAll={true}
                        onCheck={this.onCheck}
                        treeData={this.state.treeData}
                    />
                </Form.Item>
            </Form>

        )
    }
}