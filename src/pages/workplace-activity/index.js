import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import HeadUI from '../../UI/head-content'
import { workplaceLink } from '../../title-links'
import { getWorkplace, getWorkplaceSearch } from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import Taro, { getCurrentInstance } from '@tarojs/taro'

export default function WorkplaceActivity() {
  const [datasource, setDatasource] = useState([])
  const [totalpage, setTotalpage] = useState(2)
  const [currentpage, setCurrentpage] = useState(1)
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/workplace-activity/index'

  const loadData = async () => {
    if (inputValue) {
      const { data: { data } } = await getWorkplaceSearch({ inputValue, page: currentpage })
      setTotalpage(data.totalPage)
      setDatasource(datasource.concat(data.list))
      return
    }
    const { data: { data } } = await getWorkplace(currentpage)
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
      <HeadUI inputValue={inputValue} url={url} selector={workplaceLink} />
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
