import { Text, View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.less'
import { dealString } from '../../utility'
import { getRecruitDetail } from '../../api'

export default function Detail() {
  const { detailId } = getCurrentInstance().router.params
  const [dataSource, setDataSource] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: { data } } = await getRecruitDetail(detailId)
    setDataSource(data)
  }


  return (
    <View className='detail-wrapper'>
      {
        dataSource ?
          <View className='content'>
            <View className='content-title'>{dataSource.title}</View>
            <View className='content-enterpriseName'>举办方 ：{dataSource.enterpriseName}</View>
            <View className='content-publishTime'>发布时间 ：{dataSource.publishTime}</View>
            <View className='content-resume'>简历投递开始和结束时间 ： {dataSource.resumeDeliveryStartTime} -- {dataSource.resumeDeliveryEndTime}</View>
            <View className='content-email'>简历接收邮箱 ：{dataSource.resumeDeliveryEmail}</View>
            <View className='content-workplace'>工作地点 ：{dataSource.workplace}</View>
            <View>企业性质：{dataSource.enterprise.dictNatureName}</View>
            <View>所属行业：{dataSource.enterprise.dictIndustryName}</View>
            <View>企业地址：{dataSource.enterprise.address}</View>
            <View>企业简介：{dataSource.enterprise.introduction}</View>
            {
              dealString(dataSource.content)
            }
          </View> : <View className='trylatter'>上滑刷新试试</View>

      }
    </View>
  )
}
