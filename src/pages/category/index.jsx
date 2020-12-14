import React from 'react'
import { Button, Card, Table, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { getCategory, addCategory, updataCategory } from '../../api/index'
import AddForm from './form'
export default class Category extends React.Component {
    /**
     * @description 获取列表数据
     */
    state = {
        visible: false,
        categoryList: [],
        categoryName: '',
        parentId: '0',
        parentName: "",
        modalName:'新增一级分类'
    };
    getList = (parentId, name = "") => {
        getCategory(parentId).then(res => {
            this.setState({
                parentName: name,
                parentId,
                categoryList: res
            })
        })
    }
    /*
    this.setState({ 异步更新
        name
    },()=>{
        完成更新后再做操作
    })*/
    addNew = () => {
        this.setState({
            modalName:'新增一级分类',
            visible: true,
        });
    }
    editItem = (id,name) => {
        this.setState({
            modalName:'修改一级分类',
            visible: true,
        })
       
    }
    handleOk = (id='0',name='') => {
        if(this.state.modalName === '新增一级分类') {
            let data = {
                parentId: '0',
                categoryName: name,
            }
            addCategory(data)
        }else {
            let data = {
                categoryId : id,
                categoryName: name,
            }
            updataCategory(data)
        }
       
        this.setState({
            visible: false,
        });
    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    /**
     * @description 初始化所有表格标题栏
     */
    initColumns() {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                align: 'left',
            },
            {
                title: '操作',
                width: 200,
                key: 'x',
                render: (record) => (
                    <div className="display_row">
                        <div className="link_btn" onClick={()=>{this.editItem(record._id,record.name)}}>修改分类</div>
                        {/* 如果像事件回调函数传递参数,先定义匿名函数,再在回调中调用函数,就不是rendder一直调用该函数了 */}
                        <div hidden={this.state.parentId !== '0'} className="link_btn"
                            onClick={() => { this.getList(record._id, record.name) }}>查看子分类</div></div>)
            },
        ];
    }
    // 调用一次
    UNSAFE_componentWillMount() {
        this.initColumns()

    }
    componentDidMount() {
        this.getList('0')
    }
    render() {
        const leftTitle = (<div className="display_row">
            <div className={this.state.parentName ? 'link_btn' : ''} style={{ marginRight: '10px' }}
                onClick={() => { this.getList('0') }}>一级分类列表</div>
            <span hidden={!this.state.parentName} style={{ marginRight: '10px' }}>/</span>
            {this.state.parentName}
        </div>)
        const rightTitle = (
            <Button type="primary" onClick={this.addNew}>
                <PlusCircleOutlined />
                添加
            </Button>
        )
        const { categoryList } = this.state
        return (
            <div>
                <Card title={leftTitle} extra={rightTitle} bordered={false}>
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
                    onCancel={this.hideModal}>
                        <AddForm></AddForm>
                </Modal>
            </div>
        )
    }
}