import React, { Fragment, useEffect, useState } from 'react'
import HeadUI from '../../UI/head-content'
import { announceLink } from '../../title-links'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getAnnouncementSearch, getPolicySearch, getAnnouncement, getPolicy } from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import './index.less'

export default function Announcement() {
  const [number, setNumber] = useState(0)
  const [totalpage, setTotalpage] = useState(2)
  const [currentpage, setCurrentpage] = useState(1)
  const [datasource, setDatasource] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/announcement/index'


  useEffect(() => {
    switch (number) {
      default:
        outcomes(getAnnouncement, getAnnouncementSearch)
        break
      case 1:
        outcomes(getPolicy, getPolicySearch)
    }
  }, [currentpage, number])

  const outcomes = async (func1, func2) => {
    if (inputValue) {
      const { data: { data } } = await func2({ inputValue, page: currentpage })
      console.log(data)
      setTotalpage(data.totalPage)
      setDatasource(datasource.concat(data.list))
      return
    }
    const { data: { data } } = await func1(currentpage)
    console.log(data)
    setDatasource(datasource => datasource.concat(data.list))
    setTotalpage(data.totalPage)
  }
  const handleChangeData = (number) => {
    setNumber(number)
    setCurrentpage(1)
    setDatasource([])
  }


  const scrollLoad = () => {
    if (currentpage < totalpage) {
      setCurrentpage(currentpage => currentpage + 1)
      return
    }
    Taro.showToast({
      title: "已经是最后一页啦",
      duration: 1000
    });

  }


  return (
    <Fragment>
      <HeadUI inputValue={inputValue} url={url} selector={announceLink} handleData={handleChangeData} />
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
              <OnlineandPractice detailId={item.id} flag={1} detail={item} inputValue={inputValue} />
            )
          }) : <View className='null'> 最近没有企业进校宣讲，
            过一段时间再来看看吧！</View>
        }
      </ScrollView>
    </Fragment>
  )
}
