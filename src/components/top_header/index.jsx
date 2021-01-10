import React from 'react'
import { requestWeather } from '../../api/index.js'
import {connect} from 'react-redux'
import './index.less'
import { getTime } from '../../utils/timeUtil'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import {logout} from '../../redux/actions'
class topHeader extends React.Component {
    state = {
        clicked: false,
        hovered: false,
        currentTime: getTime(),
        weather: ''
    };
    hide = () => {
        this.setState({
            clicked: false,
            hovered: false,
        });
    };
    handleHoverChange = visible => {
        this.setState({
            hovered: visible,
            clicked: false,
        });
    };

    handleClickChange = visible => {
        this.setState({
            clicked: visible,
            hovered: false,
        });
    };
    /**
     * @param {Array} List // 遍历的路由数组
     * @param {String} pathName 当前页面的路由地址
     */
    getTitle = (List, pathName) => {
        let items = List.find(item => {
            if (item.key === pathName) {
                return item
            } else {
                if (item.children) {
                    this.getTitle(item.children, pathName)
                }
                return []
            }
           
        })
        if (items) {
            this.pathName = items.title
        }

    }
    /**
     * @description 获取当前时间
     */
    getCurrent = () => {
      this.intenvalId =  setInterval(() => {
            this.setState({
                currentTime: getTime()
            })
        }, 1000)

    }
    /**
     * @description 退出登录的操作
     */
    showConfirm = () => {
        let that = this
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '你确定要退出吗？',
            cancelText:'取消',
            okText:"确定",
            onOk() {
                that.props.logout()
            }
        });
    }
    /**
     * 用setDate的属性来获取接口调用返回的数据是及时的
     */
    getWeather = async () => {
        const data = await requestWeather()
        this.setState({
            weather: data
        })
    }
    /**
     * 第一次render()之后执行一次
     * 一般在此执行异步操作:发动ajax或者定时器请求
     */

    componentDidMount() {
        this.getCurrent()
        // this.getWeather()

    }
    /**
     * @description 当前组件卸载之前进行清除操作
     */
    componentWillUnmount() {
        // 清楚定时器
        clearInterval(this.intenvalId)
    }
    render() {
        const pathName = this.props.location.pathname
        this.getTitle(menuList, pathName)
        return (
            <div className="display_row main_hd all_center">
                <div style={{marginLeft:30}}>
                 {this.props.headTitle} 
                </div>
               
                <div className="weather">{this.state.currentTime} {this.state.weather.week} 🌤 {this.state.weather.weather} {this.state.weather.real}</div>
                <div>
                    欢迎,{this.props.user.username}
                </div>
                <div className="link_btn" onClick={this.showConfirm}>退出登录</div>

            </div>
        )
    }
}
// 让这个页面拥有this.props.location.pathname的功能

export default connect(
    state => ({headTitle:state.headTitle,user:state.user}),
    {logout}
)(withRouter(topHeader))