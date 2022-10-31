import { Text, View } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.less'
import {  getEnterpriseDetail, getNewsDetail } from '../../api'

export default function Detail() {
  const { detailId } = getCurrentInstance().router.params
  const [dataSource, setDataSource] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: { data } } = await getEnterpriseDetail(detailId)
    console.log('dataSource')
    console.log(data)
    setDataSource(data)
  }

  return (
    <View className='newsdetail-wrapper'>
      {
        dataSource ?
          <View className='content'>
            <View className='content-title'>{dataSource.title}</View>
            <View className='content-main' dangerouslySetInnerHTML={{
              __html: dataSource.content.replace(/&nbsp;/ig, "")
            }}></View>
            <View>发布时间：{dataSource.createTime}</View>
          </View> : <View className='trylatter'>上滑刷新试试</View>

      }
    </View>
  )
}
