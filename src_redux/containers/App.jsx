
import {connect} from 'react-redux'
import Counter from '../components/counter'
import {increment, decrement,awaitadd} from '../redux/actions'
/**
 * 容器组件 接受一个ui组件，生成一个容器组件
 */
// function mapStateToProps(state) {
//     return {
//         count: state
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         increment: (number) => dispatch(increment(number)),
//         decrement: (number) => dispatch(decrement(number))

//     }
// }
// export default connect (
//     mapStateToProps, // 指定一般属性
//     mapDispatchToProps // 指定函数属性
// )(Counter)
/**
 * connect用来 传值给 Counter，这样Counter页面可以this.props取到
 */

export default connect (
    // 指定向Counter传递一般属性
    state => ({count:state}), {increment,decrement,awaitadd}
)(Counter)
