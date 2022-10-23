import React, { useState } from 'react'
import { View,Text } from '@tarojs/components'
import './index.less'

export default function DoubleUi(props) {
  const { detail, inputValue } = props
  const detailName = detail.title
  const fillterTitle = (name, keyword) => {
    const index = name.indexOf(keyword)
    if (index !== -1) {
      const inputLength = keyword ? keyword.length : 0
      // console.log(inputLength)
      // console.log('first')
      // console.log(name.substr(0, index))
      // console.log('second')
      const finalTitle = <Text><Text>{name.substr(0, index)}</Text> <Text style={{ color: 'red' }}>{keyword}</Text><Text>{name.substr(index + inputLength)}</Text></Text>
      return finalTitle
    }
    return

  }
  return (
    <View className={`${props.flag?'double-detail-wrapper':'double-wrapper'}`}>
      <View className='double-top'>
        <Text className='title-name'>【{detail.type.typeName}】</Text>
         {
            inputValue ? <Text className='title-detail'>{fillterTitle(detailName, inputValue) ? fillterTitle(detailName, inputValue) : detail.title}</Text> : <Text className='title-detail'>{detail.title}</Text>
          }
      </View>
      <View className='double-bottom'>
        <View className='bottom-left'>
          <Text>{detail.startDate}</Text> |
          <Text>{detail.startTime}-{detail.endTime}</Text> |
          <Text className='bottom-adress' >{detail.address}</Text>
        </View>
        <View className='bottom-right'>
          <View className='dot'></View>
          <View className='date'>距今{detail.interval}天</View>
        </View>
      </View>
    </View>
  )
}
