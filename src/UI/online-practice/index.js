import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import { useRef } from 'react'
import './index.less'

export default function OnlineandPractice(props) {

  const { detail,detailUrl,inputValue ,id} = props
  const detailName = detail.title

  //对关键字进行高亮效果
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
  const navTodetail=()=>{
    Taro.navigateTo({
      url:`/pages/detail/index?detailUrl=${detailUrl}?id=${id}`
    })
  }

  return (
    <View onClick={navTodetail} className={` ${props.flag ? 'detail-wrapper' : 'online-wrapper'}`}>
      <View>
        <View className='online-top'>
          <Text className='online-recruit'>【{detail.type.typeName}】</Text>
          {/* <Text className='online-date'>{detail.createTime ? null : detail.startTime}</Text> */}
          <Text className='online-date'>{detail.createTime}</Text>
        </View>
        <View className='onlie-bottom'>
          {
            inputValue ? <View>{fillterTitle(detailName, inputValue) ? fillterTitle(detailName, inputValue) : detail.title}</View> : <View>{detail.title}</View>
          }
        </View>
      </View>
    </View>
  )
}
