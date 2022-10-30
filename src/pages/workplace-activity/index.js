import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import HeadUI from '../../UI/head-content'
import { workplaceLink } from '../../title-links'
import { getWorkplace, getWorkplaceSearch } from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import { getCurrentInstance } from '@tarojs/taro'

export default function WorkplaceActivity() {
  const [data, setData] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/workplace-activity/index'

  const loadData = async () => {
    if (inputValue) {
      const { data: { data: { list } } } = await getWorkplaceSearch(inputValue)
      setData(list)
      console.log('职场')
      return
    }
    const { data: { data: { list } } } = await getWorkplace()
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
      <HeadUI inputValue={inputValue} url={url} selector={workplaceLink} />
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
