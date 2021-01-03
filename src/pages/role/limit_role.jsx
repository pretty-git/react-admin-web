
import React from 'react';
import { Tree, Form, Input } from 'antd';
import menuList from '../../config/menuConfig'
export default class Limitform extends React.Component {
    formRef = React.createRef();
    state = {
        treeData: [],
        checkedKey:'',
        defaultMenu:[]
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
    // 监听，根据新传入的menu来更新，更新的时候才会调用，初始显示不会调用
    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         defaultMenu:nextProps.menu
    //     })
    //     console.log(this.state.defaultMenu)
    // }
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
        const defaultMenu = [...this.props.menu]
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
                        checkedKeys={defaultMenu}
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