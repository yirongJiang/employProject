import React, { Fragment, useEffect, useState } from 'react'
import HeadUI from '../../UI/head-content'
import { newsLink } from '../../title-links'
import { getNews, getNewsSearch } from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import { getCurrentInstance } from '@tarojs/taro'
import './index.less'

export default function News() {

  const [datasource, setDatasource] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(1)
  const url = '/pages/news/index'

  const loadData = async () => {
    if (inputValue) {
      const { data: { data } } = await getNewsSearch({ inputValue, page: 1 })
      setDatasource(data.list)
      setCurrentpage(data.currPage)
      setTotalpage(data.totalPage)
      console.log('新闻搜索')
      console.log(data)
      return
    }
    const { data: { data } } = await getNews(1)
    setCurrentpage(data.currPage)
    setTotalpage(data.totalPage)
    // console.log('新闻搜索')
    // console.log(data)

    setDatasource(data.list)
  }

  useEffect(() => {
    loadData()
  }, [])

  const scrollLoad = async () => {
    if (totalpage > currentpage) {
      if (inputValue) {
        setCurrentpage(currentpage + 1)
        const { data: { data: { list } } } = await getNewsSearch({ inputValue, page: currentpage })
        setDatasource(datasource.concat(list))
        return
      }
      setCurrentpage(currentpage + 1)
      const { data: { data: { list } } } = await getNews(currentpage)
      setDatasource(datasource.concat(list))
    }
    return

  }


  return (
    <Fragment>
      <HeadUI inputValue={inputValue} url={url} selector={newsLink} />
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
              <OnlineandPractice flag={1} detail={item} inputValue={inputValue} />
            )
          }) : <View className='null'> 最近没有企业进校宣讲，
            过一段时间再来看看吧！</View>
        }
      </ScrollView>
    </Fragment>
  )
}
