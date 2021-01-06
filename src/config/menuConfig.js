import { MailOutlined } from '@ant-design/icons';
import React from 'react'
const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: <MailOutlined />,
        isPubulic:true // 公开
    }, 
    {
        title: '商品',
        key: '/pro',
        icon: <MailOutlined />,
        children: [
            {
                title: '品类管理',
                key: '/category',
                icon: <MailOutlined />,
            }, {
                title: '商品管理',
                key: '/product',
                icon: <MailOutlined />,
            }
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: <MailOutlined />
    },
    {
        title: '角色管理',
        key: '/role',
        icon: <MailOutlined />
    }, {
        title: '图形图表',
        key: '/charts',
        icon: <MailOutlined />,
        children: [
            {
                title: '柱状图',
                key: '/charts/bar',
                icon: <MailOutlined />,
            }, {
                title: '折线图',
                key: '/charts/line',
                icon: <MailOutlined />,
            }, {
                title: '饼状图',
                key: '/charts/pie',
                icon: <MailOutlined />,
            }
        ]
    },
]
export default menuList