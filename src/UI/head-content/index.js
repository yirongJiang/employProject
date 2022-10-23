import { View } from '@tarojs/components'
import React, { Fragment, useEffect, useState } from 'react'
import LeftList from '../leftList'
import SearchInput from '../searchInput'
import './index.less'

export default function HeadUI(props) {
  const [selectNumber, setSelectNumber] = useState(0)
  const { url, noSearch,inputValue,isCompresive} = props

  const handleSelector = (index) => {
    setSelectNumber(index)
    props.handleData(index)
  }

  return (
    <View className='headui-top-wrapper'>
      <LeftList />
      <View className='head-top'>
        <View>重庆邮电大学就业信息网</View>
      </View>
      {
        noSearch ? <View className='head-topic'>点击查看自己喜欢的学院吧 </View> : <View className='head-search-input'>
          <SearchInput isCompresive={isCompresive} url={url}  inputValue={inputValue}  />
        </View>
      }
      <View className='headui-selector'>
        {
          props.selector.map((item, index) => {
            return (<View onClick={() => { handleSelector(index) }} className={`${selectNumber === index ? 'double-selected' : null}`}>{item.name}</View>)
          })
        }
      </View>
    </View>
  )
}
