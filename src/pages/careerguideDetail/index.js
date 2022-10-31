import { View,Text } from '@tarojs/components'
import { getCurrentInstance } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import './index.less'
import {dealString,downLoad} from '../../utility/index'
import { getCareerDetail } from '../../api'


export default function Detail() {
  const { detailId } = getCurrentInstance().router.params
  const [dataSource, setDataSource] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: { data } } = await getCareerDetail(detailId)
    console.log('data')
    console.log(data)
    setDataSource(data)
  }

  const downLoadText = () => {
    const httpResult = dealString(dataSource.content)
    downLoad(httpResult)
  }

  return (
    <View className='careerdetail-wrapper'>
     
            {
              dataSource ?
                <View className='content'>
                  <View className='content-title'>{dataSource.title}</View>
                  <View className='content-main' dangerouslySetInnerHTML={{
                    __html: dataSource.content.replace(/&nbsp;/ig, "")
                  }}></View>
                  <View>发布时间：{dataSource.createTime}</View>
                  <View className='bottom-btn' >在浏览器中打开链接下载</View>
                </View> : <View className='trylatter'>上滑刷新试试</View>

      }
    </View>
  )
}
