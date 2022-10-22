import React, { Fragment, useEffect, useState } from 'react'
import HeadUI from '../../UI/head-content'
import { announceLink } from '../../title-links'
import { getCurrentInstance } from '@tarojs/taro'
import { getNoticeSearch, getPolicySearch,getAnnouncement,getPolicy, getAnnounceSearch} from '../../api'
import { ScrollView, View } from '@tarojs/components'
import OnlineandPractice from '../../UI/online-practice'
import './index.less'

export default function Announcement() {
  const [number, setNumber] = useState()
  const [data, setData] = useState([])
  const { inputValue } = getCurrentInstance().router.params
  const url = '/pages/announcement/index'
  const outcomes = async (func1, func2) => { 
    if (inputValue) {
      const { data } = await func2(inputValue)
      console.log('公告')
      // setData(list)
      console.log(data)
      return
    }
    const result = await func1()
    console.log(result)
    setData(result.data.data.list)
  }


  const loadData = async() => {
    outcomes(getAnnouncement,getAnnounceSearch)
  }

  const handleChangeData = (number) => {
    setNumber(number)
    switch (number) {
      case 1:
        outcomes(getPolicy, getPolicySearch)
        break

      default:
        outcomes(getAnnouncement, getAnnounceSearch)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const scrollLoad = () => {
    console.log('first')
  }


  return (
    <Fragment>
      <HeadUI url={url} selector={announceLink} handleData={handleChangeData}  />
      <ScrollView
        className='announce-policy-outer'
        scrollY
        scrollWithAnimation
        lowerThreshold='6'
        onScrollToLower={scrollLoad}
      >
        {(data.length !== 0) ?
          data.map((item, index) => {
            return (
              <OnlineandPractice flag={1}  detail={item} inputValue={inputValue} />
            )
          }) : <View className='null'> 最近没有企业进校宣讲，
            过一段时间再来看看吧！</View>
        }
      </ScrollView>
    </Fragment>
  )
}
