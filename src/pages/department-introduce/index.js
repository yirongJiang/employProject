import React, { Fragment, useEffect, useState } from 'react'
import HeadUI from '../../UI/head-content'
import { getDepartment } from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { departmentLink } from '../../title-links'
import './index.less'
export default function DepartmentIntroduce() {


  const [totalpage, setTotalpage] = useState(2)
  const [currentpage, setCurrentpage] = useState(1)
  const [datasource, setDatasource] = useState([])
  const url = '/pages/department-introduce/index'

  const loadData = async () => {
    const { data: { data } } = await getDepartment(currentpage)
    setTotalpage(data.totalPage)
    setDatasource(datasource.concat(data.list))
  }

  useEffect(() => {
    loadData()
  }, [currentpage])

  const scrollLoad = () => {
    if (totalpage > currentpage) {
      setCurrentpage(currentpage + 1)
      return
    }
    Taro.showToast({
      title: '已经是最后一页啦',
      duration: 1000
    })
  }

  return (
    <Fragment>
      <HeadUI noSearch={true} url={url} selector={departmentLink} />
      <ScrollView
        className='common-outer'
        scrollY
        scrollWithAnimation
        lowerThreshold='6'
        onScrollToLower={scrollLoad}
      >
        {(datasource.length !== 0) ?
          datasource.map((item, index) => {
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
