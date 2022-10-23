import { Input, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import './index.less'

export default function SearchInput(props) {

  const [inputValue, setInputValue] = useState(props.inputValue)
  const { url, isPush, isCompresive } = props

  const handleSearch = (e) => {
    console.log(e.target.value)
    setInputValue(e.target.value)
    if (e.target.value.trim().length === 0 && isCompresive!==true&&isPush!==true) {
      Taro.redirectTo({ url: url })
    }
  }

  const handleNav = () => {

    //这里是设置首页路由跳转的方式为push
    if (inputValue.trim() && isPush) {
      Taro.navigateTo({
        url: `${url}?inputValue=${inputValue}`
      })
    }

    //其他具体路由跳转方式为redirect
    Taro.redirectTo({
      url: `${url}?inputValue=${inputValue}`
    })

  }

  return (
    <View className='input-wrapper'>
      <Input type="text" onChange={handleSearch} value={inputValue} placeholder="搜索公司、职位" />
      <View onClick={handleNav} className="Button">搜索</View>
    </View>

  )
}
