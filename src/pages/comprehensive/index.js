import React, { Fragment, useState, use, useEffect } from 'react'
import { ScrollView, View } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import HeadUI from '../../UI/head-content'
import OnlineandPractice from '../../UI/online-practice'
import { comprehensiveLink } from '../../title-links'
import { getComprehensiveSearch, getRecruitSearch, getPracticeSearch, getDoubleSearch, getAnnouncementSearch } from '../../api'
import './index.less'
import DoubleUi from '../../UI/doubleui'

export default function Comprehensive() {
  const [number, setNumber] = useState()
  const { inputValue } = getCurrentInstance().router.params
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(1)
  const [datasource, setDatasource] = useState([])
  const url = '/pages/comprehensive/index'

  const outcomes = async (func, params) => {
    const { data: { data } } = await func(params)
    console.log('综合')
    console.log(data)
    setTotalpage(data.totalPage)
    setDatasource(datasource => datasource.concat(data.list))
  }

  const handleChangeData = (number) => {
    setNumber(number)
    setCurrentpage(1)
    setDatasource([]) 
  }


  useEffect(() => {
    switch (number) {
      case 1:
        outcomes(getRecruitSearch, { inputValue, page: currentpage })
        break
      case 2:
        outcomes(getPracticeSearch, { inputValue, page: currentpage })
        break
      case 3:
        outcomes(getDoubleSearch, { inputValue, page: currentpage })
        break
      case 4:
        outcomes(getAnnouncementSearch, { inputValue, page: currentpage })
        break
      case 5:
        setDatasource([])
        break
      default:
        outcomes(getComprehensiveSearch, { inputValue, page: currentpage })
        break
    }
  }, [currentpage, number])


  const scrollLoad = () => {
    if (currentpage < totalpage) {
      setCurrentpage(currentpage => currentpage + 1)
      return
    }

    Taro.showToast({
      title: "已经是最后一页啦",
      duration: 1000
    })
  }
  return (
    <Fragment>
      <HeadUI url={url} isCompresive={true} inputValue={inputValue} handleData={handleChangeData} selector={comprehensiveLink} />
      <ScrollView
        className='common-outer'
        scrollY
        scrollWithAnimation
        lowerThreshold='9'
        onScrollToLower={scrollLoad}>
        {(datasource.length !== 0 && number !== 3) ?
          datasource.map((item, index) => {
            return (
              <OnlineandPractice flag={1} name={item.type} detail={item} inputValue={inputValue} />
            )
          }) : (number === 3 ? datasource.map((item) => { return <DoubleUi flag={1} detail={item} inputValue={inputValue} /> }) : <View className='null'> 最近没有企业进校宣讲，
            过一段时间再来看看吧！</View>)
        }
      </ScrollView>

    </Fragment>
  )
}
