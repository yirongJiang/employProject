import { Text, View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.less'
import { getAnnouncementDetail, getCareerDetail, getDoubleDetail, getEnterpriseDetail, getNewsDetail, getPolicyDetail, getPreachDetail, getWorkplaceDetail } from '../../api'
import { dealString } from '../../utility'

//此页面是新闻动态，职场活动，公告政策，就业指导，知名企业的公共详情界面

export default function Detail() {
  const { detailId, typeName } = getCurrentInstance().router.params
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    switch (typeName) {
      case '新闻动态':
        initial(getNewsDetail, detailId)
        break
      case '职场活动':
        initial(getWorkplaceDetail, detailId)
        break
      case '公告':
        initial(getAnnouncementDetail, detailId)
        break
      case '政策':
        initial(getPolicyDetail, detailId)
        break
      case '就业指导':
        initial(getCareerDetail, detailId)
        break
      case '知名企业':
        initial(getEnterpriseDetail, detailId)
        break
    }

  }
  const initial = async (func, params) => {
    const { data: { data } } = await func(params)
    console.log(data)
    setDataSource(data)
  }



  return (
    <View className='commondetail-wrapper'>
      {
        dataSource && dataSource.length !==0?
      <View className='content'>
        <View className='content-title'>{dataSource.title}</View>
        <View user-select  className='content-main' dangerouslySetInnerHTML={{
          __html: dataSource.content.replace(/&nbsp;/ig, "")
        }}></View>
        <View>发布时间 ：{dataSource.createTime}</View>
      </View> : <View className='trylatter'>上滑刷新试试</View>
      }
    </View>
  )
}
