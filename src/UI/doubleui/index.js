import React, { useState } from 'react'
import { View,Text } from '@tarojs/components'
import './index.less'

export default function DoubleUi(props) {
  const {detail}=props
  return (
    <View className={`${props.flag?'double-detail-wrapper':'double-wrapper'}`}>
      <View className='double-top'>
        <Text className='title-name'>【{detail.type.typeName}】</Text>
        <Text className='title-detail'>{detail.title}</Text>
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
