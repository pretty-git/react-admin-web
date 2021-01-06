import React from 'react'
import { Button, Card, Table, Modal, message, Popconfirm } from 'antd';
import Addfrom from './add_form'
import { FormData } from '../../utils/timeUtil'
import { getUserList, addUser, deleteUser, updateUser } from '../../api/index'
// 父组件读取子组件的数据步骤
// const ref = React.createRef();
export default class User extends React.Component {
    /**
    * @description 初始化所有表格标题栏
    */
    state = {
        ifchange: false,
        addVisible: false,
        userList: [],
        changeItem: '',
        rolesList: []
    }
    initColumns() {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                align: 'left',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                align: 'left',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                align: 'left',
            },
            {
                title: '注册时间',
                align: 'left',
                render: (item) => {
                    return FormData(item.create_time)
                }
            }, {
                title: '所属角色',
                align: 'left',
                dataIndex: 'role_id',
                render: (role_id) => this.roleNames[role_id]
                // render: (role_id) => this.state.rolesList.find(role=>role._id === role_id).name // 这样效率低
            }, {
                title: '操作',
                width: 200,
                key: 'x',
                render: (record) => (
                    <div className="display_row">
                        <div className="link_btn"
                            onClick={() => this.changeItem(record)}>修改</div>
                        <Popconfirm
                            title="确定删除吗？"
                            onConfirm={() => this.deleteItem(record)}
                            onCancel={this.cancel}
                            okText="确定"
                            cancelText="取消"
                            placement="bottomRight"
                        >
                            <div className="link_btn">
                                删除
                                </div>
                        </Popconfirm>

                    </div>)
            },
        ];
    }
    changeItem = (record) => {
        this.setState({
            changeItem: record,
            addVisible: true,
            ifchange: true
        })
    }
    addNew = async () => {
        this.setState({
            addVisible: true,
            ifchange: false
        })
    }
    hideModal = () => {
        this.setState({
            addVisible: false,
            ifchange: false,
            changeItem: null
        })
        // 重置表单
        this.formRef.current.resetFields()
    }
    addHandleOk = async () => {
        let { username, password, phone, email, role_id } = this.formRef.current.getFieldsValue()
        let data = { username, password, phone, email, role_id }
        if (this.state.ifchange) {
            data._id = this.state.changeItem._id
            await updateUser(data)
        } else {
            await addUser(data)
        }
        message.success(this.state.ifchange ? '修改成功' : '添加成功')
        this.getList()
        this.hideModal()
    }
    deleteItem = async (record) => {
        await deleteUser(record._id)
        this.getList()
        message.success("删除成功")
    }
    /**
     * @description 根据role的数组生成所有包含角色名的对象，属性名用id值
     */
    initRoles = (list) => {
        // 对象累计
        const roleName = list.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
        this.roleNames = roleName
    }
    getList = async () => {
        let { roles, users } = await getUserList()
        this.initRoles(roles)
        this.setState({
            userList: users,
            rolesList: roles
        })
    }
    componentDidMount() {
        this.getList()
    }
    // 调用一次
    UNSAFE_componentWillMount() {
        this.initColumns()

    }
    render() {
        const rightTitle = (
            <div>
                <Button type="primary" onClick={this.addNew}>
                    新建用户
                 </Button>
            </div>

        )
        const { userList, changeItem } = this.state
        return (
            <div>
                <Card title={rightTitle} bordered={false}>
                    <Table
                        columns={this.columns}
                        dataSource={userList}
                        bordered
                        rowKey={record => record._id}
                    />
                </Card>
                <Modal title={this.state.ifchange ? '修改用户' : '新建用户'}
                    visible={this.state.addVisible}
                    onOk={this.addHandleOk}
                    onCancel={this.hideModal}
                    okText="提交"
                    cancelText="取消">
                    <Addfrom
                        setForm={(form) => this.formRef = form}
                        changeItem={changeItem}
                        roleList={this.state.rolesList} />
                </Modal>
            </div>
        )
    }
}