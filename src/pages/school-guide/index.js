import React, { Fragment, useEffect, useState } from 'react'
import HeadUI from '../../UI/head-content'
import { getSchool, getSchoolGuideSearch } from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { schoolLink } from '../../title-links'
import './index.less'

export default function SchoolGuide() {

  const [totalpage, setTotalpage] = useState(2)
  const [currentpage, setCurrentpage] = useState(1)
  const [datasource, setDatasource] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/school-guide/index'

  const loadData = async () => {
    if (inputValue) {
      const { data: { data } } = await getSchoolGuideSearch({ inputValue, page: currentpage })
      console.log(data)
      setTotalpage(data.totalPage)
      setDatasource(datasource.concat(data.list))
      return
    }
    const { data: { data } } = await getSchool(currentpage)
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
      <HeadUI url={url} inputValue={inputValue} selector={schoolLink} />
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
