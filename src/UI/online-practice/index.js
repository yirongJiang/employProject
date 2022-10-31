import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import './index.less'

export default function OnlineandPractice(props) {

  const { detail, inputValue } = props
  const { id: detailId } = detail
  const { type: { typeName } } = detail
  const detailName = detail.title


  //对关键字进行高亮效果
  const fillterTitle = (name, keyword) => {
    const index = name.indexOf(keyword)
    if (index !== -1) {
      const inputLength = keyword ? keyword.length : 0
      const finalTitle = <Text><Text>{name.substr(0, index)}</Text> <Text style={{ color: 'red' }}>{keyword}</Text><Text>{name.substr(index + inputLength)}</Text></Text>
      return finalTitle
    }
    return

  }
  const navTodetail = () => {
    switch (typeName) {
      case '宣讲会':
        Taro.navigateTo({
          url: `/pages/preachDetail/index?detailId=${detailId}`
        })
        break;
      case '双选会':
        Taro.navigateTo({
          url: `/pages/doubleDetail/index?detailId=${detailId}`
        })
        break
      case '招聘':
        Taro.navigateTo({
          url: `/pages/recruitDetail/index?detailId=${detailId}`
        })
        break
      case '实习':
        Taro.navigateTo({
          url: `/pages/recruitDetail/index?detailId=${detailId}`
        })
        break
      case '新闻动态':
        Taro.navigateTo({
          url: `/pages/newsDetail/index?detailId=${detailId}`
        })
        break
      case '职场活动':
        Taro.navigateTo({
          url: `/pages/workplaceDetail/index?detailId=${detailId}`
        })
        break
      case '公告':
        Taro.navigateTo({
          url: `/pages/announceDetail/index?detailId=${detailId}`
        })
        break
      case '政策':
        Taro.navigateTo({
          url: `/pages/policyDetail/index?detailId=${detailId}`
        })
        break
      case '就业指导':
        Taro.navigateTo({
          url: `/pages/careerguideDetail/index?detailId=${detailId}`
        })
        break
      case '知名企业':
        Taro.navigateTo({
          url: `/pages/enterpriseDetail/index?detailId=${detailId}&&typeName=${typeName}`
        })
        break
    }
  }

  return (
    <View onClick={navTodetail} className={` ${props.flag ? 'detail-wrapper' : 'online-wrapper'}`}>
      <View>
        <View className='online-top'>
          <Text className='online-recruit'>【{typeName}】</Text>
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
