import { Text, View } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import React from 'react'
import './index.less'

export default function Detail() {
  const { detailUrl } = getCurrentInstance().router.params
  console.log(detailUrl)
  return (
    <View className='detail-wrapper'>
      <View className='content'>详情文字介绍</View>
    </View>
  )
}
