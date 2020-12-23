import React from 'react'
import { Select, Input, Button, Card, Table } from 'antd'
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { getProduct, searchList } from '../../api/index'
const { Option } = Select;
const { Search } = Input;

export default class Home extends React.Component {
    state = {
        loading: true,
        pageNum: 1,
        total: 0,
        productList: [],
        searchValue: "",
        searchType: "productName"
    }
    /**
     * @description 选择器的变化值
     */
    handleChange = (e) => {
        this.setState({
            searchType: e
        })
    }
    /**
     *@description 搜索
     */
    getValue = async (value) => {
        this.setState({
            loading: true
        })

        let data = {
            pageNum: this.state.pageNum,
            pageSize: 10,
            [this.state.searchType]: value
        }
        let { total, list } = await searchList(data)
        this.setState({
            loading: false,
            productList: list,
            total
        })
    }
    getList = async () => {
        this.setState({
            loading: true
        })
        let data = {
            pageNum: this.state.pageNum,
            pageSize: 10
        }
        let { total, list } = await getProduct(data)
        this.setState({
            loading: false,
            productList: list,
            total
        })
    }
    addNew = () => {

    }
    /**
     * @description 初始化表格列的数组
     */
    init = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                align: 'left',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                align: 'left',
            },
            {
                title: '价格',
                dataIndex: 'price',
                align: 'left',
                reder: (price) => '￥' + price // 修改数据显示
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <div >
                            <Button type='primary' style={{ color: "#fff" }} className="link_btn" onClick={() => { this.editItem() }}>{status == 1 ? '上架' : '下架'}</Button>
                            <div className="link_btn" style={{ color: "#000" }}>{status == 1 ? '已下架' : '在售'}</div>
                        </div>)
                }
            },
            {
                title: '操作',
                width: 200,
                key: 'x',
                render: (record) => (
                    <div className="display_row">
                        <div className="link_btn" onClick={()=>this.props.history.push(`/product/addupdate?id=${record.id}`)}>详情</div>
                        <div className="link_btn"
                            onClick={()=>this.props.history.push(`/product/addupdate?id=${record._id}`)} >修改</div>
                    </div>)
            },
        ];
    }
    getChange = (e) => {
        console.log(e)
    }
    componentDidMount() {
        this.getList()
    }
    UNSAFE_componentWillMount() {
        this.init()

    }
    render() {

        return (
            <div style={{ padding: 10 }}>

                <Select defaultValue="productName" style={{ width: 120 }} onChange={this.handleChange}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Search placeholder="请输入" style={{ width: 250, margin: '0 10px' }}
                    onSearch={this.getValue} enterButton />
                <Button type="primary" icon={<PlusCircleOutlined />} style={{ float: 'right' }} 
                    onClick={()=>this.props.history.push('/product/addupdate')}>
                    添加商品
                </Button>
                <Table
                    style={{ marginTop: '10px' }}
                    loading={this.state.loading}
                    columns={this.columns}
                    dataSource={this.state.productList}
                    bordered
                    rowKey={record => record._id}
                    pagination={{ current: this.state.pageNum, total: this.state.total, onChange: this.getChange }}
                />
            </div>
        )
    }
}