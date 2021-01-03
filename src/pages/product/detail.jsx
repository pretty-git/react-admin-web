import { Card, List } from 'antd'
import React from 'react'
import {reqCategory} from '../../api/index'
import { ArrowLeftOutlined } from '@ant-design/icons';

export default class Detail extends React.Component {
    state = {
        firstName:'',
        secondName:''
    }
    async componentDidMount() {
        let {categoryId, pCategoryId} = this.props.location.state
        if(pCategoryId === '0') {
           let data = await reqCategory(categoryId)
           this.setState({
            firstName:data.name
           })
        }else {
          let result = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
           this.setState({
            firstName:result[0].name,
            secondName:result[1].name
           })
        }
       
    }
    render() {
        const title = (
            <div className='link_btn back_icon' onClick={() => { this.props.history.goBack() }}>
                <ArrowLeftOutlined style={{ fontSize: '20px' }} />
                <span style={{ marginLeft: '15px' }}>商品详情</span>
            </div>
        )
        const {firstName,secondName} = this.state
        const product = this.props.location.state

        return (
            <Card title={title}>
                <List>
                    <List.Item style={{ justifyContent: 'initial' }}>
                        <span className="item_left">商品名称：</span>
                        <span>{product.name} </span>
                    </List.Item>
                    <List.Item style={{ justifyContent: 'initial' }}>
                        <span className="item_left">商品描述：</span>
                        <span>{product.desc} </span>
                    </List.Item>
                    <List.Item style={{ justifyContent: 'initial' }}>
                        <span className="item_left">商品价格：</span>
                        <span>RMB {product.price}元 </span>
                    </List.Item>
                    <List.Item style={{ justifyContent: 'initial' }}>
                        <span className="item_left">所属分类：</span>
                        <span>{firstName}  {secondName?'---->'+secondName:''} </span>
                    </List.Item>
                    <List.Item style={{ justifyContent: 'initial' }}>
                        <span className="item_left">商品图片：</span>
                        {
                            product.imgs.map((item,index) => {
                                return <img className="img" key={index} src={'http://localhost:5000/upload/' + item} alt="描述" />
                            })
                        }
                    </List.Item>
                    <List.Item style={{ justifyContent: 'initial' }}>
                        <span className="item_left">商品详情：</span>
                        <span dangerouslySetInnerHTML={{ __html: product.detail}} />
                    </List.Item>
                </List>
            </Card>
        )
    }
}