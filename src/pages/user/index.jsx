import React from 'react'
import { Button, Card, Table, Modal, message } from 'antd';
// import { getRoleList } from '../../api/index'
export default class User extends React.Component {
     /**
     * @description 初始化所有表格标题栏
     */
    state={
        categoryList:[{
            name:'zqx'
        }]
    }
    initColumns() {
        this.columns = [
            {
                title: '角色名',
                dataIndex: 'name',
                align: 'left',
            },
            {
                title: '操作时间',
                dataIndex: 'name',
                align: 'left',
            },
            {
                title: '授权时间',
                dataIndex: 'name',
                align: 'left',
            },
            {
                title: '授权人',
                dataIndex: 'name',
                align: 'left',
            }
        ];
    }
    AddForm = () => {

    }
    // 调用一次
    UNSAFE_componentWillMount() {
        this.initColumns()

    }
    render() {
        const rightTitle = (
            <div>
                <Button type="primary" onClick={this.addNew}>
                创建角色
                 </Button>
               <Button type="primary" onClick={this.addNew}>
                设置角色权限
            </Button> 
            </div>
            
        )
        const categoryList = []
        return (
            <div>
                <Card extra={rightTitle} bordered={false}>
                    <Table
                        columns={this.columns}
                        dataSource={categoryList}
                        bordered
                        rowKey={record => record._id}
                    />
                </Card>
                <Modal title={this.state.modalName}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    okText="提交"
                    cancelText="取消"
                    onCancel={this.hideModal}>
                   
                </Modal>
            </div>
        )
    }
}