import React from 'react'
import { Input, Form, Card, Cascader, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getCategory } from '../../api/index'
import PictureWall from './pictureswall'
import './com.less'
const { TextArea } = Input;
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};
 // 父组件读取子组件的数据步骤
const ref = React.createRef();

export default class AddUpdate extends React.Component {
   
    state = {
        options: [],
        imgList: []
    }
    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        let result = await getCategory(targetOption.value)
        if(result.length == 0) {
            targetOption.isLeaf = true
        }else {
            targetOption.children  = result.map(item => {
                return {
                    label: item.name,
                    value: item._id,
                }
            })
        }
        
        targetOption.loading = false;
        //  解构更新
        this.setState({
            options: [...this.state.options]
        })
    }
    /**
     * @description 提交数据
     */
    submit = (e) => {
       let img = ref.current.getImgList() //调用子组件拿到的
    }
    getCategoryList = async () => {
        let result = await getCategory(0)
        let option = result.map(item => {
            return {
                value: item._id,
                label: item.name,
                isLeaf: false, // 是不是叶子
            }
        })
        this.setState({
            options: option
        })
    }
    componentDidMount() {
        this.getCategoryList()
    }
    render() {
        const title = (
            <div className='link_btn back_icon' onClick={()=>{this.props.history.goBack()}}>
                <ArrowLeftOutlined style={{fontSize:'20px'}}/>
                <span style={{marginLeft:'15px'}}>添加商品</span>
            </div>

        )
        return (
            <Card title={title}>
                <Form {...layout}
                    onFinish={this.submit}
                >
                    <Form.Item
                        label="商品名称"
                        name="name"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item
                        label="商品描述"
                        name="desc"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <TextArea placeholder="请输入" rows={2} />
                    </Form.Item>
                    <Form.Item
                        label="商品价格"
                        name="price"
                        rules={[{ required: true, message: '请输入数字' },
                        { min: 0.1, message: '请输入大于0的数字' }]}
                    >
                        <Input suffix="元" />
                    </Form.Item>
                    <Form.Item
                        label="商品分类"
                        name="category"
                        rules={[{ required: true, message: '请输入' }]}
                    >
                        <Cascader
                            changeOnSelect
                            options={this.state.options}
                            loadData={this.loadData} // 当选择某个列表下加载下一级之前的监听回调
                        />
                    </Form.Item>
                    <Form.Item
                        label="商品图片"
                        name="imglist"
                        
                    >
                        {/* 父组件读取子组件的数据 父组件调用子组件的方法即可:
                        *   在父组件中通过ref得到子组件标签对象（也就是组件对象）   
                        *   子组件调用父组件的方法是 将函数以属性的形式传递给子组件
                        */}
                        <PictureWall ref={ref} />
                    </Form.Item>
                    <Form.Item
                        label="商品详情"
                        name="details"
                    >
                        <Cascader
                            changeOnSelect
                            options={this.state.options}
                            loadData={this.loadData} // 当选择某个列表下加载下一级之前的监听回调
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" size="large" htmlType="submit" >
                            提交
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}