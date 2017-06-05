import React,{ Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore'
import { CITYNAME } from '../config/localStoreKey'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userInfoActionsFormOtherFile from '../actions/userinfo'


class App extends Component{
    constructor(props, context) {
        super(props, context);
        //重写组件的shouldComponentUpdate函数，在每次更新之前判断props和state，如果有变化则返回true，无变化则返回false
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
          initDone: false
        }
    }
    render() {
        return (
            <div>
            {
              this.state.initDone
              ? this.props.children
              : <div>加载中...</div>
            }
            </div>
        )
    }
    componentDidMount(){
      // 从localstorerage里面获取城市
      let cityName = LocalStore.getItem('CITYNAME')
      if(cityName == null){
        cityName = '北京'
      }
      console.log(cityName)
      //将城市信息存储到 Redux 中
      this.props.userInfoActions.update({
        cityName：'北京'
      })

      this.setState({
        initDone: true
      })

    }
}

// 输入逻辑：将state映射到 UI 组件的参数（props）
function mapStateToProps(state){
  return {
  }
}
// 输出逻辑：将用户对 UI 组件的操作映射成 Action
function mapDispatchToProps(dispatch){
  return {
    userInfoActions: bindActionCreators(userInfoActionsFormOtherFile, dispatch)
  }
}
// UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑
/*
 * mapStateToProps 是一个函数接受state作为参数（订阅了Store，每当state更新的时候，就会自动执行重新计算ui组件的参数，重新渲染）
 *                返回一个对象其中键名对应 ui组件中参数名，第一个参数总是state对象，还可以使用第二个参数ownProps，代表容器组件的props对象
 * mapDispatchToProps 用来建立UI组件的参数到store.dispatch方法的映射(可以是一个函数，也可以是一个对象)
 *                    如果是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数
 * UI组件 Counter有两个参数：value和onIncreaseClick
 * 要和mapStateToProps、mapDispatchToProps 方法中对象中键对应
 */


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
