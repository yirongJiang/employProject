import React, { Fragment, useEffect, useState } from 'react'
import HeadUI from '../../UI/head-content'
import { getEnterprises } from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import { getCurrentInstance } from '@tarojs/taro'
import { enterprisesLink } from '../../title-links'
import './index.less'

export default function Enterprises() {

  const [data, setData] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/career-guide/index'

  const loadData = async () => {
    const { data: { data: { list } } } = await getEnterprises()
    console.log(list)
    setData(list)
  }

  useEffect(() => {
    loadData()
  }, [])

  const scrollLoad = () => {
    console.log('first')
  }

  return (
    <Fragment>
      <HeadUI  url={url} selector={enterprisesLink} />
      <ScrollView
        className='common-outer'
        scrollY
        scrollWithAnimation
        lowerThreshold='6'
        onScrollToLower={scrollLoad}
      >
        {(data.length !== 0) ?
          data.map((item, index) => {
            return (
              <OnlineandPractice flag={1} detail={item} inputValue={inputValue} />
            )
          }) : <View className='null'> 最近没有企业进校宣讲，
            过一段时间再来看看吧！</View>
        }
      </ScrollView>
    </Fragment>
  )
}
