import React, { Fragment, useEffect, useState } from 'react'
import HeadUI from '../../UI/head-content'
import { getDepartment } from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import { getCurrentInstance } from '@tarojs/taro'
import { departmentLink } from '../../title-links'
import './index.less'
export default function DepartmentIntroduce() {

  const [data, setData] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/department-introduce/index'

  const loadData = async () => {
    const { data:{data:{list}} } = await getDepartment({ key: inputValue })
    setData(list)
    console.log(list)
  }

  useEffect(() => {
    loadData()
  }, [])

  const scrollLoad = () => {
    console.log('first')
  }

  return (
    <Fragment>
      <HeadUI noSearch={true} url={url} selector={departmentLink} />
      <ScrollView
        className='department-outer'
        scrollY
        scrollWithAnimation
        lowerThreshold='6'
        onScrollToLower={scrollLoad}
      >
        {(data.length !== 0) ?
          data.map((item, index) => {
            return (
             <View className='department-item' key={item.id}>{item.name}</View>
            )
          }) : <View className='null'> 最近没有企业进校宣讲，
            过一段时间再来看看吧！</View>
        }
      </ScrollView>
    </Fragment>
  )
}
