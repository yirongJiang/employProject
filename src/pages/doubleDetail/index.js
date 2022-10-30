import { Text, View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.less'
import { getDoubleDetail, getPreachDetail } from '../../api'
import { dealString } from '../../utility'

export default function Detail() {
  const { detailId } = getCurrentInstance().router.params
  const [dataSource, setDataSource] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: { data } } = await getDoubleDetail(detailId)
    setDataSource(data)
    console.log(dataSource)
  }

  return (
    <View className='detail-wrapper'>
      {
        dataSource ?
          <View className='content'>
            <View className='content-title'>{dataSource.title}</View>
            <View className='content-publishTime'>发布时间 ：{dataSource.publishTime}</View>
            <View className='content-duringTime'>开始日期 ： {dataSource.startDate} | {dataSource.startTime}-{dataSource.endTime}</View>
            <View className='content-holsPlace'>开始报名时间点 ：{dataSource.applyStartTime}</View>
            <View className='content-writtenPlace'>结束报名时间点 ：{dataSource.applyEndTime}</View>
            <View className='content-interviewPlace'>展位图 ：{dataSource.boothImgUrl}</View>
            <View className='content-teacher'>浏览量：{dataSource.viewCount}</View>
            <View className='content-tips'>注意：一下的相关附件需要在前边加上 https://job.cqupt.edu.cn 进行访问</View>
            <div className='content-main' dangerouslySetInnerHTML={{
              __html: dataSource.content.replace(/&nbsp;/ig, "")
            }}
            ></div>
          </View>
          : <View className='trylatter'>上滑刷新试试</View>

      }
    </View>
  )
}
