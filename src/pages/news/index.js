import React, { Fragment, useEffect, useState } from 'react'
import HeadUI from '../../UI/head-content'
import { newsLink } from '../../title-links'
import { getNews, getNewsSearch } from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import { getCurrentInstance } from '@tarojs/taro'
import './index.less'

export default function News() {

  const [data, setData] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/news/index'

  const loadData = async () => {
    if (inputValue) {
      const { data: { data: { list } } } = await getNewsSearch(inputValue)
      setData(list)
      console.log('新闻搜索')
      console.log(data)
      return
    }
    const { data: { data: { list } } } = await getNews()
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
      <HeadUI  inputValue={inputValue} url={url} selector={newsLink} />
      <ScrollView
        className='news-outer'
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
