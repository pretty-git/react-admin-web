import React from 'react'
import './index.less'
import { Link, withRouter } from 'react-router-dom'
import head from '../../resource/images/head.jpg'
import memory from '../../utils/memoryUtil.js'
import { Menu } from 'antd';

import menuList from '../../config/menuConfig.js'
const { SubMenu } = Menu;

 class leftNav extends React.Component {
    handleClick = e => {
        this.current = e.key
    };
    /**
     * @descript 根据路由数组生成对应的标签数组 map方法写
     */
    getMenuList_map = (menuList) => {
        return menuList.map(item => {
            // item可能有children属性
            if (!item.children) {
                return (
                <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.key}>{item.title}</Link>
                </Menu.Item>)
            } else {
                return (
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuList_map(item.children)}
                    </SubMenu>
                )
            }
        })
    };
     /**
     * @descript 根据路由数组生成对应的标签数组 reduce方法写
     */
    getMenuList = (menuList) => {
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push(
                <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.key}>{item.title}</Link>
                </Menu.Item>)
            } else {
                // 拿到有父级的子菜单的父级key
               let cur = item.children.find(items=>this.props.location.pathname.indexOf(items.key) === 0) // 页面下的子路由也要默认打开
               if(cur) {
                   this.curpa = cur?item.key:''
               }
                pre.push(
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {this.getMenuList(item.children)}
                </SubMenu>)
            }
            return pre
        }, []) // 初始值是空数组
    }
    /**
     * @description 在第一次render之前执行,且只执行一次
     * 为第一次render渲染做准备(同步的)
     */
    UNSAFE_componentWillMount () {
        this.menuLists = this.getMenuList(menuList)
    }
    render() {
        // 保证路由地址为空时默认选中首页
        this.current = this.props.location.pathname
        // 子路由也要选择
        if(this.current.indexOf('/product') === 0) {
            this.current = '/product'
        }
        return (
            <div className='main_bd'>
                <Link to='/' className="display_row all_center color">
                    <img src={head} alt="头像" className="head_src" />
                    <div className="h9">{memory.user.username}</div>
                </Link>
                <Menu
                    theme='light'
                    onClick={this.handleClick}
                    defaultOpenKeys={[this.curpa]}
                    selectedKeys={[this.current]}
                    mode="inline"
                >
                    {
                        this.menuLists
                    }
                </Menu>
            </div>
        )
    }
}

/**
 * @description withRouter是包装组件, 高阶组件
 * 包装非路由组件,返回一个新的组件
 * 新的组件向非路由组件传递三个属性：history、match、locaiton
 * 此时获取当前路由地址就不需要从父组件获取了，直接this.props.location.pathname
 */
export default withRouter(leftNav)