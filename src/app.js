import React, { Component } from 'react'
import './app.less'
import showSomeContex from './store/showOff/showOff'

class App extends Component {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    // this.props.children 是将要会渲染的页面
    return <showSomeContex.Provider >
      {this.props.children}
    </showSomeContex.Provider>
  }
}
export default App
