import React from 'react'
import './index.less'
import { Link, withRouter } from 'react-router-dom'
import head from '../../resource/images/head.jpg'
import { Menu } from 'antd';
import {connect} from 'react-redux'
import {setHeadTitle} from '../../redux/actions'
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
     * @description 判断当前用户对item有无权限
     */
    hasAuth = (item) => {
        let key = item.key
        let userMenus =this.props.user.role.menus
        let username =this.props.user.username
        /**
         * 1.当前是admin则是最高权限
         * 2.此item是否在userMenus中
         * 3.如果什么权限都没有至少默认首页
         * 4.如果item是公开的
         */
        if (username === 'admin' || item.isPubulic || userMenus.includes(key)) {
            return true
        } else if (item.children) {
            // 如果当前item是子项
            for (var child of item.children) {
                if (userMenus.includes(child.key))
                    return true
            }
        }
        return false
    }
    /**
    * @descript 根据路由数组生成对应的标签数组 reduce方法写
    */
    getMenuList = (menuList) => {
        const pathname = this.props.location.pathname
        return menuList.reduce((pre, item) => {
           if(this.hasAuth(item))  {
            if (!item.children) {
                if(item.key === pathname || pathname.indexOf(item.key)!== -1) {
                    this.props.setHeadTitle(item.title)
                }
                pre.push(
                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key} onClick={() =>this.props.setHeadTitle(item.title)}>{item.title}</Link>
                    </Menu.Item>)
            } else {
                // 拿到有父级的子菜单的父级key
                let cur = item.children.find(items => pathname.indexOf(items.key) === 0) // 页面下的子路由也要默认打开
                if (cur) {
                    this.curpa = cur ? item.key : ''
                }
                pre.push(
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.getMenuList(item.children)}
                    </SubMenu>)
            }
           }
            
            return pre
        }, []) // 初始值是空数组
    }
    /**
     * @description 在第一次render之前执行,且只执行一次
     * 为第一次render渲染做准备(同步的)
     */
    UNSAFE_componentWillMount() {
        this.menuLists = this.getMenuList(menuList)
    }
    render() {
        // 保证路由地址为空时默认选中首页
        this.current = this.props.location.pathname
        // 子路由也要选择
        if (this.current.indexOf('/product') === 0) {
            this.current = '/product'
        }
        return (
            <div className='main_bd'>
                <Link to='/' className="display_row all_center color">
                    <img src={head} alt="头像" className="head_src" />
                    <div className="h9">{this.props.user.username}</div>
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
export default connect(
   state => ({user:state.user}),{setHeadTitle}
)(withRouter(leftNav)) 