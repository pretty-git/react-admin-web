import React from 'react';
/**
 * UI组件 页面交互
 */
export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.addNumber = React.createRef();
      }
    // state = {
    //     count:0
    // }
    add = () => {
        let number = this.addNumber.current.value * 1 // 字符转数字
        this.props.increment(number)

        // this.setState(state => ({
        //     count: state.count + number
        // }))
    }
    down = () => {
        let number = this.addNumber.current.value * 1 // 字符转数字
        this.props.decrement(number)
    }
    addOdd = () => {
        let number = this.addNumber.current.value * 1 // 字符转数字
        if(this.props.count % 2 === 1) {
            this.props.increment(number)
            
        }
        
    }
    addAsync = () => {
        let number = this.addNumber.current.value * 1 // 字符转数字
        this.props.awaitadd(number)
        
    }
    render() {
        return (
            <div style={{margin:40}}>
                <p>click {this.props.count}  times </p>
                <div>
                    <select ref={this.addNumber}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select>
                    <button style={{margin:'0 10px'}} onClick={this.add}> + </button>
                    <button style={{margin:'0 10px'}} onClick={this.down}> - </button>
                    <button style={{margin:'0 10px'}} onClick={this.addOdd}> increment if odd </button>
                    <button style={{margin:'0 10px'}} onClick={this.addAsync}> increment async </button>
                </div>
            </div>
        )
    }
}
