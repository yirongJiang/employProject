import { Text, View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.less'
import { dealString, downLoad } from '../../utility'
import { getPreachDetail } from '../../api'

export default function Detail() {
  const { detailId } = getCurrentInstance().router.params
  const [dataSource, setDataSource] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: { data } } = await getPreachDetail(detailId)
    setDataSource(data)
  }

  const downLoadText = () => {
    const httpResult = dealString(dataSource.content)
    downLoad(httpResult)
  }
  return (
    <View className='detail-wrapper'>
      {
        dataSource ?
          <View className='content'>
            <View className='content-title'>{dataSource.title}</View>
            <View className='content-enterpriseName'>举办方 ：{dataSource.enterpriseName}</View>
            <View className='content-publishTime'>发布时间 ：{dataSource.publishTime}</View>
            <View className='content-duringTime'>开始日期 ： {dataSource.startDate} | {dataSource.startTime}-{dataSource.endTime}</View>
            <View className='content-holsPlace'>招聘地点 ：{dataSource.holdPlace}</View>
            <View className='content-writtenPlace'>笔试地点和规模 ：{dataSource.writtenPlace} | {dataSource.dictWrittenVenueScale}人</View>
            <View className='content-interviewPlace'>笔试地点和规模 ：{dataSource.writtenPlace} | {dataSource.dictInterviewVenueScale}人</View>
            <View className='content-dicGroupRecruitName'>{dataSource.dictGroupRecruitName}</View>
            <View className='content-teacher'>负责老师{dataSource.teacher}</View>
            <View className='down' onClick={downLoadText}>下载并打开公司详情</View>
          </View> : <View className='trylatter'>上滑刷新试试</View>

      }
    </View>
  )
}
