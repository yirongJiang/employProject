import React, { Fragment, useEffect, useState } from 'react'
import HeadUI from '../../UI/head-content'
import { careerGuideLink } from '../../title-links'
import { getCareer, getCareerSearch } from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import { getCurrentInstance } from '@tarojs/taro'
import './index.less'


export default function CareerGuide() {
  const [data, setData] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/career-guide/index'

  const loadData = async () => {
    if(inputValue){
      const {data:{data:{list}}}=await getCareerSearch(inputValue)
      setData(list)
      return 
    }
    const { data: { data: { list } } } = await getCareer()
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
      <HeadUI inputValue={inputValue} url={url} selector={careerGuideLink} />
      <ScrollView
        className='carrer-guide-outer'
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
