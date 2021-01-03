import React from 'react'
import { Input, Form, Card, Cascader, Button, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getCategory, addProduct, updataProduct } from '../../api/index'
import PictureWall from './pictureswall'
import RichText from './rich_text'
const { TextArea } = Input;
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};
// 父组件读取子组件的数据步骤
const ref = React.createRef();
const richtext_ref = React.createRef()
export default class AddUpdate extends React.Component {
    formRef = React.createRef();
    
    state = {
        options: [],
        imgList: [],
        richText: '', // 富文本
        ifChange: false // 是否是更新
    }
    /**
     * @description 手动获取分类的下一级 
     */
    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        let result = await getCategory(targetOption.value)
        if (result.length === 0) {
            targetOption.isLeaf = true
        } else {
            targetOption.children = result.map(item => {
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
    submit = async (e) => {
        //调用子组件拿到的
        let detail = richtext_ref.current.getValue()
        let imgs = ref.current.getImgList()
        let { name, desc, price, category } = e
        let pCategoryId = category.length === 1 ? '0' : category[0]
        let categoryId = category.length === 1 ? category[0] : category[1]
        let data = {
            categoryId,
            pCategoryId,
            name,
            desc,
            price,
            detail,
            imgs
        }
        if (this.state.ifChange) {
            data._id = this.props.location.state._id
            await updataProduct(data)
            message.success("修改成功")
        } else {
            await addProduct(data)
            message.success("添加成功")
        }

    }
    /**
     * @description 获取联动信息
     */
    getCategoryList = async () => {
        let result = await getCategory(0)
        let option = result.map(item => {
            return {
                value: item._id,
                label: item.name,
                isLeaf: false, // 是不是叶子
            }
        })
        if (this.category.length === 2) {
            let index = option.findIndex(item => { return item.value === this.category[0] })
            let child = await getCategory(this.category[0])
            option[index].children = child.map(item => {
                return {
                    value: item._id,
                    label: item.name,
                    isLeaf: false, // 是不是叶子
                }
            })
        }
        this.setState({
            options: option
        }, () => {
            const pro = this.props.location.state
            this.formRef.current.setFieldsValue({
                category: [pro.pCategoryId === '0' ? pro.categoryId : pro.pCategoryId, pro.categoryId]
            })
        })
        this.update()
    }
    componentDidMount() {
        // 获取分类联动
        this.getCategoryList()
        if (this.props.location.state) {
            this.setState({
                ifChange: true
            })
            this.imgs = this.props.location.state.imgs.map(item => {
                return {
                    uid: item,
                    status: 'done',
                    name: '111',
                    url: 'http://localhost:5000/upload/' + item
                }
            })
        }

    }
    update = () => {
        if (this.props.location.state) {
            const pro = this.props.location.state
            this.category = [pro.pCategoryId === '0' ? pro.categoryId : pro.pCategoryId, pro.categoryId]
            const { desc, name, price } = pro

            return {
                desc,
                name,
                price
            }

        } else {
            return {}
        }
    }
    render() {
        const title = (
            <div className='link_btn back_icon' onClick={() => { this.props.history.goBack() }}>
                <ArrowLeftOutlined style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '15px' }}>{this.state.ifChange ? '修改商品' : '添加商品'}</span>
            </div>
        )
        return (
            <Card title={title}>
                <Form {...layout}
                    name="control-ref"
                    ref={this.formRef}
                    onFinish={this.submit}
                    initialValues={this.update()}
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
                        <PictureWall ref={ref} fileList={this.imgs} />
                    </Form.Item>
                    <Form.Item
                        label="商品详情"
                        name="details"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 20 }}
                    >
                        <RichText ref={richtext_ref} detail={this.props.location.state.detail} />
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