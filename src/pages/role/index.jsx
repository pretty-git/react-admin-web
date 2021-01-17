import React from 'react'
import { Button, Card, Table, Modal, message } from 'antd';
import { getRoleList,addRole,updateRole } from '../../api/index'
import Addfrom from './addrole_form'
import Limitform from './limit_role'
import Stroage from '../../utils/storageUtil'
import {FormData} from '../../utils/timeUtil'
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'
// 父组件读取子组件的数据步骤
const ref = React.createRef();
class Role extends React.Component {
    /**
    * @description 初始化所有表格标题栏
    */
    state = {
        addVisible: false, // 添加角色显示
        limitVisible: false, // 设置权限显示
        roleList: [],
        roleName: '',
        currentRole:'',
        curretKey:'',
        menu: [], // 角色权限暂存
        ifShowBtn: true //按钮权限
    }
    /**
     * @description 初始化列表格式
     */
    initColumns() {
        this.columns = [
            {
                title: '角色名',
                dataIndex: 'name',
                align: 'left',
            },
            {
                title: '创建时间',
                align: 'left',
                render: (item) => {
                    return FormData(item.create_time) 
                }
            },
            {
                title: '授权时间',
                align: 'left',
                render: (item) => {
                    return FormData(item.create_time) 
                }
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                align: 'left',
            }
        ];
    }
    hideModal = () => {
        this.setState({
            addVisible: false,
            limitVisible: false
        });
    };
    addHandleOk = async() => {
      let name =  this.formRef.current.getFieldValue('rolename')
      if(name) {
       await addRole(name)
        this.setState({
            addVisible:false
        })
        message.success('创建成功')
        this.getList()
      }else {
          message.error("请输入角色名称")
      }
    }
    limitHandleOk = async() => {
        let user = Stroage.getUSer()
         await updateRole({
            _id:this.state.currentRole._id,
            menus: ref.current.getKeys(),
            auth_time:user.create_time,
            auth_name:user.username
        })
        if(this.props.user.role_id === this.state.currentRole._id) {
            this.props.logout()
            message.warning("该角色已更新权限，请重新登录")
            return
        }
        message.success("设置成功")
        this.hideModal()
        this.getList()
    }
    /**
     * @description 获取角色列表
     */
    getList = async () => {
        let result = await getRoleList()
        this.setState({
            roleList:result
        })
    }
    onChange = (key,selectedRows) => {
       this.setState({
           roleName: selectedRows[0].name,
           ifShowBtn:false,
           curretKey:key,
           currentRole:selectedRows[0],
           menu:selectedRows[0].menus
       })
    }
    // 调用一次
    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getList()
    }
    render() {
        const rightTitle = (
            <div style={{ float: 'left', }}>
                <Button type="primary" onClick={() => { this.setState({ addVisible: true }) }} style={{ margin: '0px 10px' }}>
                    创建角色
                 </Button>
                <Button type="primary" onClick={() => { 
                    // 为了让弹窗时拿到最新的权限展示
                    let key = this.state.curretKey
                    let index = this.state.roleList.findIndex(item=>{return item._id === key})
                    this.setState({
                        menu:this.state.roleList[index].menus
                    })
                    if(this.state.roleName) {
                        this.setState({ limitVisible: true })
                    }else {
                        this.setState({ ifShowBtn:false })
                    }
                  
                    // this.onChange()
                 }} disabled={this.state.ifShowBtn}>
                    设置角色权限
            </Button>
            </div>

        )

        return (
            <div>
                <Card title={rightTitle} bordered={false}>
                    <Table
                        rowSelection={{
                            type: 'radio',
                            onChange: this.onChange
                        }}
                        columns={this.columns}
                        dataSource={this.state.roleList}
                        bordered
                        rowKey={record => record._id}
                    />
                </Card>
                <Modal title='创建角色'
                    visible={this.state.addVisible}
                    onOk={this.addHandleOk}
                    okText="提交"
                    cancelText="取消"
                    onCancel={this.hideModal}>
                    <Addfrom
                        setForm={(form) => this.formRef = form} />
                </Modal>
                <Modal title='设置角色权限'
                    visible={this.state.limitVisible}
                    onOk={this.limitHandleOk}
                    okText="提交"
                    cancelText="取消"
                    onCancel={this.hideModal}>
                    <Limitform
                        ref={ref}
                        setForm={(form) => this.formRef = form}
                        name={this.state.roleName}
                        menu={this.state.menu}
                    />
                </Modal>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),{logout}
)(Role)